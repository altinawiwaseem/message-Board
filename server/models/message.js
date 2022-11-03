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
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    required: [true, "The content should not be empty"],
  },
  image: {
    type: String,
  },
  dates: {
    created: { type: Date, default: Date.now(), last_edited: Date },
  },
  category: {
    type: String,
    required: true,
    enum: ["sent", "delivered", "read"],
  },
  comments: {
    type: [
      {
        dates: {
          created: { type: Date, default: Date.now(), last_edited: Date },
        },
        comment: String,
        user: Object,
        deleted: { type: Boolean, default: false },
      },
    ],
    created: Date.now,
  },

  deleted: Boolean,
});

const Message = model("message", MessageSchema);

export default Message;
