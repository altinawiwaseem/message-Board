import Message from "../models/message.js";

export const createMessage = async (req, res) => {
  try {
    const newMessage = await Message.create({
      user: req.user._id,
      content: req.body.message,
      category: "sent",
      deleted: false,
    });
    console.log(newMessage);
    return res.status(201).json({ message: newMessage });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

export const getAllMessages = async (req, res) => {
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

export const updateMessage = async (req, res) => {
  const { content, id } = req.body;
  try {
    const editedMessage = await Message.findByIdAndUpdate(
      id,
      { content: content },
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
