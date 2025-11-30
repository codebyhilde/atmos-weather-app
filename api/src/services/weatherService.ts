import type { OpenWeatherMapResponse } from "../interfaces/openWeatherData.js";
import type { GeocodingResponse } from "../interfaces/geocodingResponse.js";
import type { NormalizedWeatherData } from "../interfaces/normalizedWeatherData.js";
import { normalizeWeatherData } from "../utils/dataNormalization.js";

const API_KEY = process.env.OPENWEATHER_API_KEY;

// --- SOLUCIÓN DEFINITIVA: TIPADO MANUAL ---
// Definimos nuestra propia interfaz para ignorar la confusión global de TS
interface SafeFetchResponse {
    ok: boolean;
    status: number;
    statusText: string;
    json: () => Promise<unknown>;
}
// ------------------------------------------

// Obtener Latitud y Longitud
async function getCoordinates(
    city: string,
    countryCode: string,
    stateCode?: string
): Promise<{ lat: number; lon: number }> {
    if (!API_KEY) throw new Error("API Key no configurada.");

    const q = [city, stateCode, countryCode].filter(Boolean).join(",");
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct`;

    const params = new URLSearchParams({
        q: q,
        limit: "1",
        appid: API_KEY
    });

    const fullUrl = `${geoUrl}?${params.toString()}`;

    try {
        // TRUCO NUCLEAR: Casting doble para borrar la inferencia incorrecta de TS
        const rawResponse = await fetch(fullUrl);
        const response = rawResponse as unknown as SafeFetchResponse;

        if (!response.ok) {
            throw new Error(
                `Error HTTP: ${response.status} ${response.statusText}`
            );
        }

        // Casteamos el resultado de json()
        const data = (await response.json()) as GeocodingResponse[];

        if (!data || data.length === 0) {
            throw new Error(`Ubicación no encontrada: ${q}`);
        }

        const { lat, lon } = data[0];
        return { lat, lon };
    } catch (error) {
        console.error("Error en Geocoding API:", error);
        if (
            error instanceof Error &&
            error.message.includes("Ubicación no encontrada")
        ) {
            throw error;
        }

        throw new Error("No se pudo encontrar la ubicación.");
    }
}

// Obtener datos del clima
async function getRawWeatherData(
    lat: number,
    lon: number
): Promise<OpenWeatherMapResponse> {
    if (!API_KEY) throw new Error("API Key no configurada.");

    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall`;

    const params = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        appid: API_KEY,
        units: "metric",
        exclude: "minutely,alerts",
        lang: "es"
    });

    const fullUrl = `${weatherUrl}?${params.toString()}`;

    try {
        // TRUCO NUCLEAR: Casting doble nuevamente
        const rawResponse = await fetch(fullUrl);
        const response = rawResponse as unknown as SafeFetchResponse;

        if (!response.ok) {
            throw new Error(
                `Error HTTP: ${response.status} ${response.statusText}`
            );
        }

        const data = (await response.json()) as OpenWeatherMapResponse;
        return data;
    } catch (error) {
        console.error("Error en One Call API:", error);
        throw new Error("No se pudo obtener el clima.");
    }
}

export async function getNormalizedWeather(
    city: string,
    countryCode: string,
    stateCode?: string
): Promise<NormalizedWeatherData> {
    const { lat, lon } = await getCoordinates(city, countryCode, stateCode);
    const rawData = await getRawWeatherData(lat, lon);
    const normalizedData = normalizeWeatherData(rawData);
    return normalizedData;
}