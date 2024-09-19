import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
	{
		roomName: {
			type: String,
			required: true,
		},
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messagesRoom: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "MessageRoom",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
