import Room from "../models/room.model.js";
import User from "../models/user.model.js";
import MessageRoom from "../models/messageRoom.model.js";
import { broadcastRoomMessagesUpdate, io } from "../socket/socket.js";

export const sendMessageRoom = async (req, res) => {
	try {
		const { messageRoom } = req.body;
		const { id: roomId } = req.params;
		const senderId = req.user._id;
		const fullname = req.user.fullname;
		const profilePic = req.user.profilePic;

		// Find the room by roomId
		let room = await Room.findById(roomId);
		let sender = await User.findById(senderId);

		if (!room) {
			return res.status(404).json({ error: "Room not found" });
		}

		if (!sender) {
			return res.status(404).json({ error: "User not found" });
		}

		// Create new messageRoom entry
		const newMessageRoom = new MessageRoom({
			senderId,
			roomId,
			messageRoom,
			fullname,
			profilePic
		});

        await Room.updateOne(
            { _id: roomId }, // Filter: room to update
            { $addToSet: { participants: senderId } } // Ensure uniqueness in participants
        );
        
		room.messagesRoom.push(newMessageRoom._id);

		await Promise.all([room.save(), newMessageRoom.save()]);
		// Broadcast the updated messages via Socket.IO
		broadcastRoomMessagesUpdate({newMessageRoom,sender});

		res.status(201).json(newMessageRoom);
	} catch (error) {
		console.error("Error in sendMessageRoom controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessagesRoom = async (req, res) => {
	try {
		const { id: roomId } = req.params; // Get roomId from params
		// Find the room and populate messagesRoom and senderId
		const room = await Room.findById(roomId)
			.populate({
				path: 'messagesRoom',
				populate: { 
					path: 'senderId', 
					select: 'username profilePic _id' // Populate senderId to get user details
				}
			})
			.exec();

		if (!room) return res.status(404).json({ error: 'Room not found' });

		// Prepare messages with senderId details
		const messages = room.messagesRoom.map(message => ({
            _id: message._id,
            messageRoom: message.messageRoom,
            createdAt: message.createdAt,
            senderId: {
                _id: message.senderId._id,
                username: message.senderId.username,
                profilePic: message.senderId.profilePic
            }
        }));

		res.status(200).json(messages);
	} catch (error) {
		console.error("Error in getMessagesRoom controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
