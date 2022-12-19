import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import itemRouter from "./routes/item.router.js";
import sellerRouter from "./routes/seller.router.js";
import userRouter from "./routes/user.router.js";
import orderRouter from "./routes/order.router.js";
import cartRouter from "./routes/cart.router.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname + "public/uploads/")));
app.use(
  cors({
    origin: "https://bestbuy-client.vercel.app",
  })
);
const PORT = process.env.PORT || 8081;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`connected to db and server running on PORT ${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use("/seller", sellerRouter);
app.use("/item", itemRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
