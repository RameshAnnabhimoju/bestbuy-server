import { Router } from "express";
import {
  createUser,
  findUser,
  getAllUsers,
  userLogin,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();
router.post("/", createUser);
router.post("/login", userLogin);
router.get("/", getAllUsers);
router.get("/:id", findUser);
router.delete("/:id", deleteUser);
export default router;
