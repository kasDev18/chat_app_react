import Conversation from "../models/conversation.js";
import Message from "../models/messages.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { getCache, setCache } from "../utils/redisClient.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;

        // console.log(message);
        
        
        const { id: receiverId } = req.params;
        // console.log(receiverId);
        
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

        // console.log(newMessage._id);
        

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);


        // SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

        // await conversation.save();
        // await newMessage.save();
    } catch (err) {
        console.log("Error in sendMessage controller", err.message);
        res.status(401).json({ error: "Internal Server Error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: userChatToId } = req.params;
        const senderID = req.user._id;
        const cacheKey = `messages_${senderID}_${userChatToId}`;
        const cachedMessages = await getCache(cacheKey);
        if (cachedMessages) {
            return res.status(201).json(cachedMessages);
        }
        const conversation = await Conversation.findOne({
            participants: { $all: [senderID, userChatToId] }
        }).populate("messages");
        
        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        await setCache(cacheKey, messages, 3600); // cache for 1 hour
        res.status(201).json(messages);
    } catch (err) {
        console.log("Error in getMessage controller", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};