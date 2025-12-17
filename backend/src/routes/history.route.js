import express from "express";
import { HistoryController } from "../controllers/history.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const HistoryRouter = express.Router();

HistoryRouter.get("/", verifyToken, HistoryController.getRecords);
HistoryRouter.post("/", verifyToken, HistoryController.createRecord);

export { HistoryRouter };