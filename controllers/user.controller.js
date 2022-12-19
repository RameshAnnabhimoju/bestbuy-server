import user from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const salt = bcrypt.genSaltSync(10);

//create user account
export const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkEmail = await user.findOne({ email });
    if (checkEmail) {
      return res.status(202).json({ msg: "Email already exists" });
    }
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await user.create({ ...req.body, password: hashPassword });
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ msg: error.errors });
  }
};

// find user by id.
export const findUser = async (req, res) => {
  const { id } = req.params;
  user
    .findOne({ _id: id })
    .populate()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ msg: error.message }));
};
// get all users.
export const getAllUsers = async (req, res) => {
  await user
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ msg: error.message }));
};

//login for user
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    if (!email | !password) {
      return res.status(400).json({
        auth: false,
        email: "Fill correct details",
        password: "Fill correct details",
      });
    }
    const userDetails = await user.findOne({ email });
    if (!userDetails) {
      return res.status(404).json({ auth: false, email: "User doesn't exist" });
    }
    if (!userDetails.password === hashPassword) {
      return res
        .status(400)
        .json({ auth: false, password: "Invalid Credentials" });
    }
    const accessToken = jwt.sign(
      { user: userDetails },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.status(202).json({
      msg: "Logged in Successfully",
      auth: true,
      token: accessToken,
      user: userDetails,
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

//delete user account.
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await user
    .deleteOne({ _id: id })
    .then(() => res.json("Successfully deleted"))
    .catch((error) => res.status(400).json({ msg: error.message }));
};
