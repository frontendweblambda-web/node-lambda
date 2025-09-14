import cors from "cors";
import express from "express";
import { healthCheck } from "./middleware/health.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/v1/health", healthCheck);

app.post("/api/v1/data", (req, res) => {
  const data = req.body;
  console.log("Received data:", data);
  res.status(200).json({ message: "Data received", data });
});

async function main() {
  console.log("App started");
}

main();

export { app };
