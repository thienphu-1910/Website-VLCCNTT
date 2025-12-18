import express from "express";
import { SensorLogsController } from "../controllers/sensor.logs.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const SensorLogsRouter = express.Router();

SensorLogsRouter.get("/sensorlogs", verifyToken, SensorLogsController.getRecords);
SensorLogsRouter.post("/sensorlogs", verifyToken, SensorLogsController.createRecord);

export { SensorLogsRouter };