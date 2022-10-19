import { Router } from "express";
import { registerUser } from "../controllers/userControllers.js";
const router = Router();

//http://localhost:5000/user/register
router.use("/register", registerUser);

export default router;
