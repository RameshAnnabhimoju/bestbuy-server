import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  createCartItem,
  updateCartItem,
  getCartItems,
  removeCartItem,
  clearCart,
} from "../controllers/cart.controller.js";
const router = Router();
router.post("/", createCartItem);
router.patch("/:id", updateCartItem);
router.delete("/:id", removeCartItem);
router.delete("/clear/:id", clearCart);
router.get("/:id", getCartItems);
export default router;
