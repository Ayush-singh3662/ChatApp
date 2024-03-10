import express from "express";
import { getusersForSidebar } from "../controllers/user.controller.js";
import protectRoutes from "../middlewares/protectRoutes.js";

const router = express.Router();

router.get('/', protectRoutes, getusersForSidebar);

export default router;