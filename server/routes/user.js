import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/userControllers.js";
const router = Router();

//http://localhost:5000/user/register
router.post("/register", registerUser);

//http://localhost:5000/user/login
router.post("/login", loginUser);

//http://localhost:5000/user/allUser
router.get("/allUser", getAllUsers);

export default router;
