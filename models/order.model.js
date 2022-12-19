import { model, Schema } from "mongoose";

//order model for database
const orderSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  listingPrice: { type: Number, required: true },
  seller: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  orderStatus: {
    type: String,
    required: "true",
    enum: ["active", "shipped", "delivered", "refund"],
    default: "active",
  },
  user: { type: Schema.Types.ObjectId, ref: "user" },
  orderedOn: { type: Date, default: Date.now() },
  itemId: { type: Schema.Types.ObjectId },
});

const order = model("order", orderSchema);

export default order;
