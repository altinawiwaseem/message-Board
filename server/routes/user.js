import { Router } from "express";
/* import passport from "passport"; */

import {
  registerUser,
  loginUser,
  getAllUsers,
  /*  logout, */
} from "../controllers/userControllers.js";
const router = Router();
/* router.use(passport.authenticate("jwt", { session: false }));
 */
//http://localhost:5000/user/register
router.post("/register", registerUser);

//http://localhost:5000/user/login
router.post("/login", loginUser);

//http://localhost:5000/user/allUser
router.get("/allUser", getAllUsers);

//http:localhost:5000/user/logout
/* router.get("/logout", logout); */

export default router;
