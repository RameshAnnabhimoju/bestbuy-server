import userFeedback from "../models/userFeedback.item.model.js";

export const createUserFeedback = async (req, res) => {
  await userFeedback
    .create(req.body)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ msg: error.message }));
};

export const deleteUserFeedback = async (req, res) => {
  const { id } = req.body;
  await userFeedback
    .deleteOne({ _id: id })
    .then(() => res.json({ msg: "Successfully deleted" }))
    .catch((error) => res.status(400).json({ msg: error.message }));
};

export const updateUserFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    await userFeedback
      .updateOne({ _id: id }, req.body)
      .then((data) =>
        res.json({ msg: "UserFeedback updated successfully", Data: data })
      )
      .catch((error) => res.status(400).json({ msg: error.message }));
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};
