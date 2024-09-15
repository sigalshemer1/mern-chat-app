import Room from "../models/room.model.js";
//import { getReceiverSocketId, io } from "../socket/socket.js";

export const getAllRooms = async (req, res) =>{
	try {
		const allRooms = await Room.find({}).toArray();

		res.status(200).json(allRooms);
	} catch (error) {
		console.error("Error in getAllRooms: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};



export const setRoom = async (req, res) => {
	try {
		const { roomName } = req.body;
		//const { id: roomId } = req.params;
		//const senderId = req.user._id;
        const senderId = req.params;

		let room = await Room.findOne(roomId);

		// if (!room) {
		// 	room = await Room.create({
		// 		participants: [senderId],
        //         roomName: roomName
		// 	});
		// }

		// await room.save();

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		// const receiverSocketId = getReceiverSocketId(receiverId);
		// if (receiverSocketId) {
		// 	// io.to(<socket_id>).emit() used to send events to specific client
		// 	io.to(receiverSocketId).emit("newMessage", newMessage);
		// }

		//res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in room controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getRoom = async (req, res) => {
	try {
		const { id: roomId } = req.params;

		const room = await Room.findOne(roomId);

		if (!room) return res.status(200).json([]);

		const messagesRoom = room.messages;

		res.status(200).json(messagesRoom);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
