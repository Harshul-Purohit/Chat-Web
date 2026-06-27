import { Conversation } from "../Models/conversationModel.js";
import { Message } from "../Models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create and populate the new message
    const newMessage = await Message.create({ senderId, receiverId, message });
    const populatedMessage = await Message.findById(newMessage._id)
      .populate("senderId receiverId", "_id userName email");

    gotConversation.messages.push(newMessage._id);
    await gotConversation.save();

    return res.status(201).json({ newMessage: populatedMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.userId;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate({
      path: "messages",
      populate: { path: "senderId receiverId", select: "_id userName email" }
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    return res.status(200).json({
      success: true,
      messages: conversation.messages
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
