import { Router } from "express";
import {
  createSeller,
  findSeller,
  getAllSellers,
  sellerLogin,
  deleteSeller,
} from "../controllers/seller.controller.js";

const router = Router();
router.get("/", getAllSellers);
router.post("/", createSeller);
router.post("/login", sellerLogin);
router.delete("/:id", deleteSeller);
router.get("/:id", findSeller);

export default router;
