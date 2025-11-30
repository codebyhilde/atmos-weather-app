import express, { Router, type Request, type Response } from "express"; // Importamos los tipos como si fueran independientes
import { getNormalizedWeather } from "../services/weatherService";

const router = Router();

// Endpoint: GET /api/weather
router.get("/weather", (async (req, res) => {
    // TIPADO DE RUNTIME: Usamos el casting 'as' para req.query
    const { city, country, state } = req.query as {
        city?: string;
        country?: string;
        state?: string;
    };

    if (typeof city !== "string" || typeof country !== "string") {
        // res.json() es el método de Express para enviar JSON
        return res.status(400).json({
            error: 'Los parámetros "city" y "country" son obligatorios.'
        });
    }

    const stateCode = typeof state === "string" ? state : undefined;

    try {
        const cleanData = await getNormalizedWeather(city, country, stateCode);

        // res.json() es el método de Express
        return res.status(200).json(cleanData);
    } catch (error) {
        console.error("Error en el endpoint /weather:", error);
        // res.json() es el método de Express
        return res.status(500).json({ error: (error as Error).message });
    }
}) as express.Handler); // <--- TRUCO: Castear la función como Handler

export default router;