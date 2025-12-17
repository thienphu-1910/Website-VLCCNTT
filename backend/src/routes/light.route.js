import express from "express";
import { LightController } from "../controllers/light.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const LightRouter = express.Router();
LightRouter.post("/", verifyToken, LightController.createLightStatus);

export { LightRouter };