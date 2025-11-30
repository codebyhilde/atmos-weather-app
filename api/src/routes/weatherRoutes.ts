import { Router } from "express";
import { getNormalizedWeather } from "../services/weatherService.js";
// Asumo que tienes un tipo para la respuesta exitosa, si no, usa 'any' o defínelo aquí
import type { NormalizedWeatherData } from "../interfaces/normalizedWeatherData.js";

const router = Router();

// 1. Definimos la estructura de lo que esperamos en la URL (?city=...)
interface WeatherQueryParams {
    city?: string;
    country?: string;
    state?: string;
}

// 2. Definimos la estructura de la respuesta (Éxito | Error)
type WeatherResponseBody = NormalizedWeatherData | { error: string };

// 3. Aplicamos los Genéricos a la ruta
// Request<Params, ResBody, ReqBody, ReqQuery>
// Response<ResBody>
router.get("/weather", async (
    req: express.Request, 
    res: express.Response
) => {
    // Ahora req.query está tipado. 
    // Sin embargo, Express por defecto permite arrays en query, así que forzamos string.
    const { city, country, state } = req.query;

    // Validación de Tipos en Runtime (necesaria porque la query viene de la URL)
    if (typeof city !== "string" || typeof country !== "string") {
        // TypeScript ahora sabe que el cuerpo de la respuesta DEBE cumplir WeatherResponseBody
        res.status(400).json({
            error: 'Los parámetros "city" y "country" son obligatorios y deben ser cadenas de texto.'
        });
        return;
    }

    const stateCode = typeof state === "string" ? state : undefined;

    try {
        const cleanData = await getNormalizedWeather(city, country, stateCode);
        
        // cleanData debe coincidir con NormalizedWeatherData
        res.status(200).json(cleanData);
    } catch (error) {
        console.error("Error en el endpoint /weather:", error);
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;