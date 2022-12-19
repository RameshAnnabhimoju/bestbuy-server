import { Router } from "express";
import {
  createOrder,
  getOrder,
  updateStatus,
  getOrdersByFilters,
} from "../controllers/order.controller.js";
const router = Router();
router.post("/", createOrder);
router.get("/filter", getOrdersByFilters);
router.get("/:id", getOrder);
router.patch("/update/:id", updateStatus);
export default router;
