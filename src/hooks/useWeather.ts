import { useState } from "react";

interface HourlyForecast {
    time: string;
    temp: number;
    icon: string;
}

// Datos del pronóstico semanal
interface DailyForecast {
    labels: string[];
    maxTemps: number[];
    minTemps: number[];
}

// Datos actuales del clima
interface CurrentData {
    hour: string;
    temp: number;
    description: string;
    icon: string;
    humidity: number;
    wind_speed: number;
    pressure: number;
}

// Interfaz principal
interface CompleteWeatherData {
    timezone: string;
    current: CurrentData;
    hourly: HourlyForecast[];
    daily: DailyForecast;
}

// URL base del backend
const API_URL = "http://localhost:3001/api";

export function useWeather() {
    const [data, setData] = useState<CompleteWeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Función orquestadora del fetching a la API
    const fetchWeather = async (search: {
        city: string;
        country: string;
        state?: string;
    }) => {
        setIsLoading(true);
        setError(null);
        setData(null);

        try {
            // Construcción de la URL completa, incluyendo los parámetros de búsqueda
            const params = new URLSearchParams({
                city: search.city,
                country: search.country
            });
            if (search.state) {
                params.append("state", search.state);
            }

            // URL COMPLETA: "http://localhost:3001/api/weather?city=X&country=Y..."
            const fullUrl = `${API_URL}/weather?${params.toString()}`;

            // Llamada al backend
            const response = await fetch(fullUrl);

            // Manejo de Errores
            if (!response.ok) {
                // Se intenta leer el cuerpo del error JSON que Express envió (ej: { error: "Ubicación no encontrada" })
                const errorData = await response.json();

                // Si el backend envió un mensaje de error específico (como "Ubicación no encontrada"), lo usamos.
                // Si no, usamos el statusText.
                throw new Error(
                    errorData.error ||
                        response.statusText ||
                        "Error desconocido del servidor."
                );
            }

            // Parseo del JSON y almacenamiento de los datos
            const cleanData = (await response.json()) as CompleteWeatherData;
            setData(cleanData);
        } catch (err) {
            // Para errores lanzados por el backend
            if (err instanceof Error) {
                setError(err.message);
            } else {
                // Para errores de red o parseo inesperados
                setError(
                    "No se pudo conectar al servidor del clima. Verifique la conexión."
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, error, fetchWeather };
}
