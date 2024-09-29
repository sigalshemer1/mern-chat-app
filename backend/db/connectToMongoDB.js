import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToMongoDB = async () => {
	try {
		const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/chat-app';
		await mongoose.connect(mongoURL);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
