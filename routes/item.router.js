import { Router } from "express";
import {
  createItem,
  deleteItem,
  deleteItemPermanently,
  updateItem,
  getItem,
  getAllItems,
  getItemsByFilter,
  getItemBySeller,
  getHomeItem,
} from "../controllers/item.controller.js";
import {
  createUserFeedback,
  deleteUserFeedback,
  updateUserFeedback,
} from "../controllers/userFeedback.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();
router.post("/", upload.single("image"), createItem);
router.delete("/delete/:id", deleteItemPermanently);
router.patch("/delete/:id", deleteItem);
router.patch("/:id", updateItem);
router.post("/feedback", createUserFeedback);
router.delete("/feedback/:id", deleteUserFeedback);
router.patch("/feedback/:id", updateUserFeedback);
router.get("/home", getHomeItem);
router.get("/filters/filter", getItemsByFilter);
router.get("/seller/:id", getItemBySeller);
router.get("/:id", getItem);
router.get("/", getAllItems);
export default router;
