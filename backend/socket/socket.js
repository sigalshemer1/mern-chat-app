import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {}; // {userId: socketId}

// Function to get the socket ID for a specific user
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

// Function to broadcast room updates
export const broadcastRoomUpdate = (room) => {
    io.emit("roomAdded", room); // Emit the 'roomAdded' event with room data
};

// Function to broadcast room messages update
export const broadcastRoomMessagesUpdate = (messageRoom) => {
    console.log("Broadcasting new message:", messageRoom);  // Add this line
    io.to(messageRoom.roomId).emit("getNewMessagesRoom", messageRoom); // Emit the 'MessageRoomAdded' event with room data
};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") userSocketMap[userId] = socket.id;

    // Emit the list of online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Listen for disconnect events
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
