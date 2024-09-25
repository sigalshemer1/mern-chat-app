import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar ,getUserForRoom} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getUserForRoom);

export default router;
