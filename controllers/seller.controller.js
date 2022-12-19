import seller from "../models/seller.model.js";
import order from "../models/order.model.js";
import item from "../models/items.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const salt = bcrypt.genSaltSync(10);

//create seller account
export const createSeller = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkEmail = await seller.findOne({ email });
    if (checkEmail) {
      return res.status(202).json({ msg: "Email already exists" });
    }
    const hashPassword = bcrypt.hashSync(password, salt);
    const newSeller = await seller.create({
      ...req.body,
      password: hashPassword,
    });
    return res.status(200).json(newSeller);
  } catch (error) {
    return res.status(500).json({ msg: error.errors });
  }
};

// find user by id.
export const findSeller = async (req, res) => {
  const { id } = req.params;
  seller
    .findOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ msg: error.message }));
};
// get all sellers.
export const getAllSellers = async (req, res) => {
  await seller
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ msg: error.message }));
};

//login for seller
export const sellerLogin = async (req, res) => {
  const { email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    if (!email || !password) {
      return res.status(400).json({
        auth: false,
        email: "Fill correct details",
        password: "Fill correct details",
      });
    }
    const sellerDetails = await seller.findOne({ email });
    if (!sellerDetails) {
      return res.status(404).json({ auth: false, email: "User doesn't exist" });
    }

    if (!sellerDetails.password === hashPassword) {
      return res
        .status(400)
        .json({ auth: false, password: "Invalid Credentials" });
    }
    const accessToken = jwt.sign(
      { user: sellerDetails },
      process.env.ACCESS_TOKEN_SECRET
    );
    const salesOrders = await order.aggregate([
      {
        $match: {
          seller: sellerDetails._id,
          orderStatus: "delivered",
          orderedOn: {
            $gte: [new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)],
          },
        },
      },
      {
        $sort: { orderedOn: -1 },
      },
    ]);
    const refundOrders = await order.aggregate([
      {
        $match: {
          seller: sellerDetails._id,
          orderStatus: "refund",
          orderedOn: {
            $gte: [new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)],
          },
        },
      },
      {
        $sort: { orderedOn: -1 },
      },
    ]);
    const activeOrders = await order.aggregate([
      {
        $match: {
          seller: sellerDetails._id,
          orderStatus: "active",
          orderedOn: {
            $gte: [new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)],
          },
        },
      },
      {
        $sort: { orderedOn: -1 },
      },
    ]);
    const sales =
      salesOrders.reduce((total, order) => total + order.listingPrice, 0) || 0;
    const orders = activeOrders.length || 0;
    const refunds =
      refundOrders.reduce((total, itemm) => total + itemm.listingPrice, 0) || 0;
    const totalOrders = await order.find({
      seller: sellerDetails._id,
      orderStatus: "delivered",
    });
    const totalEarnings =
      totalOrders.reduce((total, order) => total + order.listingPrice, 0) || 0;
    const listings = await item.find({
      seller: sellerDetails._id,
    });
    const totalListings = listings.length || 0;
    const lowStock = listings.filter((listing) => listing.stock < 50) || 0;
    const discounted =
      listings.filter((listing) => listing.actualPrice !== "") || 0;

    const lowStockListings = lowStock.length || 0;
    const discountedListings = discounted.length || 0;

    return res.status(202).json({
      msg: "Logged in Successfully",
      auth: true,
      token: accessToken,
      seller: sellerDetails,
      displayDetails: {
        lowStockListings,
        discountedListings,
        totalEarnings,
        totalListings,
        sales,
        orders,
        refunds,
        settledAmount: totalEarnings,
        unsettledAmount: orders,
      },
    });
  } catch (error) {
    return res.status(500).json({ auth: false, msg: error });
  }
};

//delete seller account.
export const deleteSeller = async (req, res) => {
  const { id } = req.params;
  await seller
    .deleteOne({ _id: id })
    .then(() => res.json("Successfully deleted"))
    .catch((error) => res.status(400).json({ msg: error.message }));
};
