import express from "express";
import morgan from "morgan";
import cors from "cors";
import { HistoryRouter } from "./routes/history.route.js";
import { LightRouter } from "./routes/light.route.js";
import { mqtt_controller } from "./controllers/mqtt_controller.js";

export const app = express();

// Accept request from other domains (Cross-Origin Resource Sharing)
app.use(cors());

// Parse JSON data and form data sent from client to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// log
app.use(morgan("dev"));
app.use("/api/histories", HistoryRouter);
app.use("/api/light", LightRouter);

mqtt_controller.init();