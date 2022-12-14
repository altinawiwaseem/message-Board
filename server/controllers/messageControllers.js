import Message from "../models/message.js";
import User from "../models/user.js";

export const createMessage = async (req, res) => {
  try {
    const newMessage = await Message.create({
      user: req.user._id,
      title: req.body.title,
      content: req.body.message,
      image: req.body.image.image,
      comment: req.body.comment,
      category: "sent",
      deleted: false,
    });

    return res.status(201).json({ message: newMessage });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

export const getUserMessages = async (req, res) => {
  try {
    const allMessages = await Message.find({ user: req.user._id }).populate(
      "user"
    );

    if (!allMessages) {
      return res.status(200).json({ message: "No messages yet" });
    }
    return res.status(200).json(allMessages);
  } catch (error) {
    return res.send(error.message);
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const allMessages = await Message.find().populate("user");

    if (!allMessages) {
      return res.status(200).json({ message: "No messages yet" });
    }
    return res.status(200).json(allMessages);
  } catch (error) {
    return res.send(error.message);
  }
};

export const updateMessage = async (req, res) => {
  const { content, id, title } = req.body;

  try {
    const editedMessage = await Message.findByIdAndUpdate(
      id,
      { content: content, title: title },
      { new: true }
    );

    if (!editedMessage) return;

    return res.status(200).json({ message: editedMessage });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.body;

  try {
    const deleteMessage = await Message.findByIdAndUpdate(id, {
      deleted: true,
    });

    return res.status(200).json({ message: deleteMessage });
  } catch (error) {
    return res.send(error.message);
  }
};

export const addComment = async (req, res) => {
  const { comment, id, user } = req.body;

  try {
    const newComment = await Message.findByIdAndUpdate(
      id,
      { $push: { comments: { comment, user } } },
      { new: true }
    );

    if (!newComment) return;

    return res.status(200).json({ message: newComment });
  } catch (error) {
    return res.send(error.message);
  }
};

export const deleteComment = async (req, res) => {
  const { messageId, commentId } = req.body;
  console.log(messageId);
  console.log(commentId);
  try {
    const deleteComment = await Message.findByIdAndUpdate(messageId, {
      $pull: {
        comments: {
          _id: commentId,
        },
      },
    });
    return res.status(200).json({ message: "comment deleted" });
  } catch (error) {
    return res.send(error.message);
  }
};
