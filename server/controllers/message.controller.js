import Conversation from "../models/conversation.js";
import Message from "../models/messages.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { getCache, setCache, deleteCache } from "../utils/redisClient.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        // Socket.IO functionality
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // Clear message cache for both sender and receiver
        await deleteCache(`messages_${senderId}_${receiverId}`);
        await deleteCache(`messages_${receiverId}_${senderId}`);

        res.status(201).json(newMessage);
    } catch (err) {
        console.error("Error in sendMessage controller:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: userChatToId } = req.params;
        const senderID = req.user._id;
        const cacheKey = `messages_${senderID}_${userChatToId}`;
        const cachedMessages = await getCache(cacheKey);
        if (cachedMessages) {
            return res.status(200).json(cachedMessages);
        }
        const conversation = await Conversation.findOne({
            participants: { $all: [senderID, userChatToId] }
        }).populate("messages");
        
        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        await setCache(cacheKey, messages, 3600);
        res.status(200).json(messages);
    } catch (err) {
        console.error("Error in getMessage controller:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};