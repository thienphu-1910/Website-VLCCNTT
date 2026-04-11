import express from "express";
import { BuzzerController } from "../controllers/buzzer.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const BuzzerRouter = express.Router();
BuzzerRouter.post("/", verifyToken, BuzzerController.createBuzzerStatus);

export { BuzzerRouter };