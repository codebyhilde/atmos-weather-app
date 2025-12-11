import "dotenv/config";
import express, { type Express } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import weatherRouter from "./routes/weatherRoutes.js";
import { weatherRateLimiter } from "./middlewares/rateLimiter.js";

const PORT = process.env.PORT || 3001;

// Inicialización de Express
const app: Express = express();

// Desactivación de esta cabecera por seguridad
app.disable("x-powered-by");

app.set("trust proxy", 1);

app.use(corsMiddleware());

// Manejo de JSON
app.use(express.json());

// Ruta de Bienvenida (Health Check)
app.get("/", (_req: express.Request, res: express.Response) => {
    res.status(200).send("Servidor del Clima operativo.");
});

// Uso del rate limiter
app.use("/api", weatherRateLimiter);

// Enrutamiento de la API
app.use("/api", weatherRouter);

// Arrancar el Servidor
app.listen(PORT, () => {
    console.log(`⚡️ Backend Server running at http://localhost:${PORT}`);
});

export default app;
