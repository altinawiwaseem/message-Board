import mongoose from "mongoose";
import { generateRobohashAvatar } from "../helpers/avatar.js";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "the user must have username"],
    unique: true,
  },
  firstname: {
    type: String,
    required: [true, "the user must have a firstname"],
  },
  lastname: String,
  ip: String,
  hash: { type: String, required: [true, "the user must have a password"] },
  avatar: { type: String, default: generateRobohashAvatar() },
  dates: { registered: Date, default: Date.now, last_active: Date },
  messages: Number,
});

const User = mongoose.model("user", UserSchema);

export default User;
