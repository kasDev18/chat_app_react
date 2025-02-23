import Conversation from "../models/conversation.js";
import Message from "../models/messages.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;

        console.log(message);
        
        
        const { id: receiverId } = req.params;
        console.log(receiverId);
        
        const senderId = req.user._id;

        // console.log(senderId);

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })  

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }   

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        // console.log(newMessage);
        

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();

        res.status(201).json(newMessage);

        // await conversation.save();
        // await newMessage.save();
    } catch (err) {
        console.log("Error in sendMessage controller", err.message);
        res.status(401).json({ error: "Internal Server Error" });
    }
};