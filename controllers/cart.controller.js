import cart from "../models/cart.model.js";

export const createCartItem = async (req, res) => {
  try {
    await cart
      .create(req.body)
      .then(() => res.json("Cart Item Created Successfully"))
      .catch((error) => res.status(400).json(error));
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    await cart
      .findByIdAndUpdate({ _id: id }, { quantity })
      .then(() => res.json("Cart Item Quantity Updated Successfully"))
      .catch((error) => res.status(400).json(error));
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getCartItems = async (req, res) => {
  try {
    await cart
      .find({ user: req.params.id })
      .then((data) => res.json(data))
      .catch((error) => res.status(400).json(error));
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const removeCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    await cart
      .findByIdAndDelete(id)
      .then(() => res.json("Cart Item Removed Successfully"))
      .catch((error) => res.status(400).json(error));
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const clearCart = async (req, res) => {
  const { id } = req.params;
  try {
    await cart
      .deleteMany({ user: id })
      .then(() => res.json("Cart cleared Successfully"))
      .catch((error) => res.status(400).json(error));
  } catch (error) {
    return res.status(500).json(error);
  }
};
