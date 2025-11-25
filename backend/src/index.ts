import "dotenv/config";
import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import weatherRouter from "./routes/weatherRoutes.js";
import { weatherRateLimiter } from "./middlewares/rateLimiter.js"

// const PORT = process.env.PORT || 3001;

// Inicialización de Express
const app: Express = express();

app.set('trust proxy', 1);

const allowedOrigins = [
    "http://localhost:5173",
    "https://atmos-weather-one.vercel.app"
];

app.use(cors());

// Manejo de JSON
app.use(express.json());

// Ruta de Bienvenida (Health Check)
app.get("/", (_req: Request, res: Response) => {
    res.status(200).send("Servidor del Clima operativo.");
});

// Uso del rate limiter
app.use("/api", weatherRateLimiter);

// Enrutamiento de la API
app.use("/api", weatherRouter);

// Arrancar el Servidor
// app.listen(PORT, () => {
//     console.log(`⚡️ Backend Server running at http://localhost:${PORT}`);
// });

export default app;