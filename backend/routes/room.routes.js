import express from "express";
import { getRoom, setRoom,getAllRooms } from "../controllers/room.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getAllRooms);
router.get("/:id", protectRoute, getRoom);
router.post("/", protectRoute, setRoom);

export default router;
