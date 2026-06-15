import { Conversation } from "../Models/conversationModel.js";
import { Message } from "../Models/messageModel.js"

export const sendMessage = async (req,res)=>{
  try {
    const senderId = req.userId;
    const receiverId = req.params.id;
    const {message} = req.body;


    let gotConversation = await Conversation.findOne({
      participants:{$all : [senderId,receiverId] },
    }).populate({
  path: "messages",
  populate: { path: "senderId receiverId", select: "userName email" }
});


    if(!gotConversation){
      gotConversation = await Conversation.create({
        participants:[senderId,receiverId]
      })
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message
    })

    if(newMessage){
      gotConversation.messages.push(newMessage._id)

    }

    await gotConversation.save();

    return res.status(201).json({
      message:"Message sent successfully"
    })
    


  } catch (error) {
      console.error(error);
  return res.status(500).json({
    success: false,
    message: "Server error",
    error: error.message
  });
  }
}



export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.userId;

    // ✅ use the Conversation model
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate({
      path: "messages",
      populate: { path: "senderId receiverId", select: "userName email" }
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
