import express from "express";
import { getMessagesRoom, sendMessageRoom } from "../controllers/messageRoom.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessagesRoom);
router.post("/send/:id", protectRoute, sendMessageRoom);

export default router;