import "dotenv/config";
import express from "express";
import cors from "cors";
import weatherRouter from "./src/routes/weatherRoutes.js";
import { weatherRateLimiter } from "./src/middlewares/rateLimiter.js";

// Inicialización de Express
const app = express();

app.set("trust proxy", 1);

const NODE_ENVIRONMENT = process.env.NODE_ENV;

const allowedOrigins = [
    "http://localhost:5173",
    "https://atmos-weather-one.vercel.app"
];

const corsOptions = {
    origin: function (origin, callback) {
        // Permite solicitudes sin origen (como Postman o peticiones del mismo servidor)
        if (!origin) return callback(null, true);

        // Verificamos si el origen está en nuestra lista
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg =
                "La política CORS para este sitio no permite el acceso desde el origen especificado.";
            return callback(new Error(msg), false);
        }

        // Si pasa la validación, se permite la solicitud
        return callback(null, true);
    }
};

app.use(cors(corsOptions));

// Manejo de JSON
app.use(express.json());

// Ruta de Bienvenida (Health Check)
app.get("/", (req, res) => {
    res.status(200).send("Servidor del Clima operativo.");
});

// Uso del rate limiter
app.use("/api", weatherRateLimiter);

// Enrutamiento de la API
app.use("/api", weatherRouter);

if (NODE_ENVIRONMENT === "development") {
    // Arrancar el Servidor
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`⚡️ Backend Server running at http://localhost:${PORT}`);
    });
}

export default app;
