import cors from "cors";
import express from "express";
import { healthCheck } from "./middleware/health.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/v1/health", healthCheck);

export { app };
