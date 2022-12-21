import order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    await order
      .create(req.body)
      .then((data) => res.json("Orer Created Successfully"))
      .catch((error) => res.status(400).json(error));
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOrder = async (req, res) => {
  try {
    await order
      .find({ seller: req.params.id })
      .then((data) => res.json(data))
      .catch((error) => res.status(400).json(error));
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;
  try {
    await order
      .findByIdAndUpdate({ _id: id }, { orderStatus })
      .then((data) => res.json("Status updated successfully"))
      .catch((error) => res.status(400).json(error));
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOrdersByFilters = async (req, res) => {
  try {
    await order
      .find({ ...req.query })
      .then((data) => res.json(data))
      .catch((error) => res.status(404).json({ msgs: error }));
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
