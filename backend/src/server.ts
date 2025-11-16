import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import weatherRouter from "./routes/weatherRoutes";

const PORT = process.env.PORT || 3001;

// Inicialización de Express
const app = express();

const allowedOrigins = [
    "http://localhost:5173"
    // AGREGAR: "https://dominio-de-produccion.com"
];

const corsOptions = {
    origin: function (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void
    ) {
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
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Servidor del Clima operativo.");
});

// Enrutamiento de la API
// Todas las rutas dentro de weatherRouter serán accesibles con el prefijo /api
// Ejemplo: /api/weather
app.use("/api", weatherRouter);

// Arrancar el Servidor
app.listen(PORT, () => {
    console.log(`⚡️ Backend Server running at http://localhost:${PORT}`);
});
