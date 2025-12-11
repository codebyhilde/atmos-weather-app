import cors from "cors";

const ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://atmos-weather-one.vercel.app"
];

/*
 * Middleware con parametro opcional
 * Valor por defecto {} (sin pasarle ningún argumento)
 */
export const corsMiddleware = ({
    allowedOrigins = ALLOWED_ORIGINS
}: { allowedOrigins?: string[] } = {}) =>
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            const msg =
                "La política CORS para este sitio no permite el acceso desde el origen especificado.";
            return callback(new Error(msg), false);
        }
    });
