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
			ref: "room",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		// createdAt, updatedAt
	},
	{ timestamps: true }
);

const MessageRoom = mongoose.model("MessageRoom", messageRoomSchema);

export default MessageRoom;
