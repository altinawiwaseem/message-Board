import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "The message must have a user"],
  },
  title: {
    type: String,
    /* required: [true, "the content should not be empty"], */
  },
  content: {
    type: String,
    required: [true, "the content should not be empty"],
  },
  image: {
    type: String,
  },
  dates: {
    created: { type: Date, default: Date.now, last_edited: Date },
  },
  category: {
    type: String,
    required: true,
    enum: ["sent", "delivered", "read"],
  },
  comment: {
    type: String,
    created: Date.now,
  },

  deleted: Boolean,
});

const Message = model("message", MessageSchema);

export default Message;
