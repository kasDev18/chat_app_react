import { Server } from "socket.io";
import http from "http";
import express from "express";
import { serverConfig, isDevelopment } from "../config/env.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: serverConfig.corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Socket connection management
const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export const getOnlineUsers = () => {
  return Object.keys(userSocketMap);
};

// Socket event handlers
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  
  if (isDevelopment()) {
    console.log(`🔌 User connected: ${socket.id}`);
    console.log(`👤 User ID: ${userId}`);
  }
  
  // Add user to socket map if userId is valid
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    
    if (isDevelopment()) {
      console.log(`📊 Online users: ${getOnlineUsers().length}`);
    }
  }
  
  // Broadcast online users to all clients
  io.emit("getOnlineUsers", getOnlineUsers());

  // Handle user disconnect
  socket.on("disconnect", () => {
    if (isDevelopment()) {
      console.log(`🔌 User disconnected: ${socket.id}`);
    }
    
    // Remove user from socket map
    if (userId && userId !== "undefined") {
      delete userSocketMap[userId];
      
      if (isDevelopment()) {
        console.log(`📊 Online users: ${getOnlineUsers().length}`);
      }
    }
    
    // Broadcast updated online users
    io.emit("getOnlineUsers", getOnlineUsers());
  });
});

export { app, server, io };
