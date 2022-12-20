import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import itemRouter from "./routes/item.router.js";
import sellerRouter from "./routes/seller.router.js";
import userRouter from "./routes/user.router.js";
import orderRouter from "./routes/order.router.js";
import cartRouter from "./routes/cart.router.js";
import cors from "cors";
dotenv.config();
const app = express();
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     // "https://bestbuy-client.vercel.app/"
//     req.headers.origin
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use("/uploads", express.static("public/uploads/"));
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
