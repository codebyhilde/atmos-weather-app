import "dotenv/config";
import express from "express";
import cors from "cors";
import weatherRouter from "./src/routes/weatherRoutes.js";
import { weatherRateLimiter } from "./src/middlewares/rateLimiter.js";

const app = express();

app.set("trust proxy", 1);

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://atmos-weather-one.vercel.app"
  ]
}));

app.use(express.json());

// Ruta de Health Check
app.get("/api", (req, res) => {
  res.json({ message: "Weather API is working" });
});

// Rate limiter
app.use(weatherRateLimiter);

// Rutas de la API
app.use("/api/weather", weatherRouter);

// Export específico para Vercel
export default (req, res) => {
  app(req, res);
};