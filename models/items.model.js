import { model, Schema } from "mongoose";

//item model for database
const itemSchema = new Schema(
  {
    image: { type: String, require: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    listingPrice: { type: Number, required: true },
    actualPrice: { type: Number },
    discount: { type: Number },
    seller: { type: Schema.Types.ObjectId, required: true },
    stock: { type: Number, required: true },
    unitsSold: { type: Number, default: 0 },
    unitsRefunded: { type: Number, default: 0 },
    userFeedback: [{ type: Schema.Types.ObjectId, ref: "userFeedback" }],
    brand: { type: String },
    ram: { type: String },
    storage: { type: String },
    battery: { type: String },
    camera: { type: String },
    chipset: { type: String },
    network: { type: String },
    os: { type: String },
    graphics: { type: String },
    processor: { type: String },
    type: { type: String },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const item = model("item", itemSchema);

export default item;
