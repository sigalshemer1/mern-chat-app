import mongoose from "mongoose";

const messageRoomSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		roomId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Room", // Corrected reference to Room model
			required: true,
		},
		messageRoom: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const MessageRoom = mongoose.model("MessageRoom", messageRoomSchema);

export default MessageRoom;

