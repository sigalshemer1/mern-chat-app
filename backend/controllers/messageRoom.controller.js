import Room from "../models/room.model.js";
import MessageRoom from "../models/messageRoom.model.js";
import { broadcastRoomMessagesUpdate, io } from "../socket/socket.js";

export const sendMessageRoom = async (req, res) => {
	try {
		const { messageRoom } = req.body;
		const { id: roomId } = req.params;
		const senderId = req.user._id;

		let room = await Room.findOne({
			participants: { $all: [senderId] },
		});

		if (!room) {
			room = await Room.create({
				participants: [senderId],
			});
		}

		const newMessageRoom = new MessageRoom({
			senderId,
			roomId,
			messageRoom,
		});

		if (newMessageRoom) {
			room.messagesRoom.push(newMessageRoom._id);
		}

		// this will run in parallel
		await Promise.all([room.save(), newMessageRoom.save()]);

		// SOCKET IO FUNCTIONALITY To update all users with the new messages of the room
		broadcastRoomMessagesUpdate(room); 

		res.status(201).json(newMessageRoom);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessagesRoom = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const room = await Room.findOne({
			participants: { $all: [senderId, userToChatId] }, //TO IMPLEMENT TO ALL PARTICIPANTS!!!!
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!room) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
