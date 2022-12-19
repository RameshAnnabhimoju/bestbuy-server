import { Schema, model } from "mongoose";

//userFeedback model is for storing reviews and ratings of users, in items.model
const userFeedbackSchema = new Schema({
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String },
  nameofUser: { type: Schema.Types.ObjectId, required: true, ref: "user" },
});

const userFeedback = model("userFeedback", userFeedbackSchema);
export default userFeedback;
