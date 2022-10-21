import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "The message must have a user"],
  },
  content: {
    type: String,
    required: [true, "the content should not be empty"],
  },
  dates: {
    created: { type: Date, default: Date.now, last_edited: Date },
  },
  category: {
    type: String,
    required: true,
    enum: ["sent", "delivered", "read"],
  },

  deleted: Boolean,
});

const Message = model("message", MessageSchema);

export default Message;
