import { Router } from "express";
import passport from "passport";
import {
  addComment,
  createMessage,
  deleteComment,
  deleteMessage,
  getAllMessages,
  getUserMessages,
  updateMessage,
} from "../controllers/messageControllers.js";
const router = Router();
router.use(passport.authenticate("jwt", { session: false }));
//"http://localhost:5000/message/create"
router.post("/create", createMessage);

//"http://localhost:5000/message/allmessages"
router.get("/allmessages", getAllMessages);

//"http://localhost:5000/message/usermessages"
router.get("/usermessages", getUserMessages);

//"http://localhost:5000/message/update"
router.patch("/update", updateMessage);
export default router;

//"http://localhost:5000/message/delete"
router.patch("/delete", deleteMessage);

//"http://localhost:5000/message/comment"
router.patch("/comment", addComment);

//"http://localhost:5000/message/deletecomment"
router.patch("/deletecomment", deleteComment);
