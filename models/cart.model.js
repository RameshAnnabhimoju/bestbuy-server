import { model, Schema } from "mongoose";
const cartSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  listingPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  seller: { type: Schema.Types.ObjectId, required: true },
  user: { type: Schema.Types.ObjectId, ref: "user" },
  itemId: { type: Schema.Types.ObjectId },
});
const cart = model("cart", cartSchema);
export default cart;
