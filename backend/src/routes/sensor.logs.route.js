import express from "express";
import { SensorLogsController } from "../controllers/sensor.logs.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const SensorLogsRouter = express.Router();

SensorLogsRouter.get("/:id", verifyToken, SensorLogsController.getRecords);
//SensorLogsRouter.post("/", verifyToken, SensorLogsController.createRecord);
SensorLogsRouter.get("/events/:id", SensorLogsController.getRealTimeRecord);

export { SensorLogsRouter };