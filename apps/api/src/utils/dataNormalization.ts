import type {
    OpenWeatherMapResponse,
    Hourly,
    Daily
} from "../interfaces/openWeatherData.js";

import type {
    NormalizedWeatherData,
    NormalizedCurrentData,
    NormalizedDailyForecast,
    NormalizedHourlyForecast
} from "../interfaces/normalizedWeatherData.js";

// Formatea un timestamp UNIX a una hora local (AM/PM)
// Requiere la zona horaria (Ejemplo: "America/Caracas")
function formatUnixToLocalTime(unix: number, timezone: string): string {
    const date = new Date(unix * 1000);
    const timeString = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: timezone
    });

    return timeString.replace(/^0/, ""); // Quita el 0 inicial (03:00 PM -> 3:00 PM)
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Procesa datos del clima actual
function normalizeCurrentData(
    current: OpenWeatherMapResponse["current"],
    timezone: string
): NormalizedCurrentData {
    return {
        hour: formatUnixToLocalTime(current.dt, timezone),
        temp: Math.round(current.temp),
        description: capitalizeFirstLetter(
            current?.weather[0]?.description ?? "No weather description"
        ),
        weatherCode: current?.weather[0]?.icon ?? "1d",
        humidity: current.humidity,
        wind_speed: Math.round(current.wind_speed * 3.6), // Convertir m/s a kph
        pressure: current.pressure
    };
}

// Procesa el pronóstico por horas
function normalizeHourlyForecast(
    hourlyData: Hourly[],
    timezone: string
): NormalizedHourlyForecast[] {
    // Se toman las 6 horas posteriores a la hora actual
    const nextHours = hourlyData.slice(1, 7);

    const hourlyForecast: NormalizedHourlyForecast[] = nextHours.map(hour => {
        return {
            time: formatUnixToLocalTime(hour.dt, timezone),
            temp: Math.round(hour.temp),
            weatherCode: hour?.weather[0]?.icon ?? "1d"
        };
    });

    return hourlyForecast;
}

// Procesa el pronóstico semanal
function normalizeDailyForecast(dailyData: Daily[]): NormalizedDailyForecast {
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const processedData: NormalizedDailyForecast = {
        labels: [],
        maxTemps: [],
        minTemps: []
    };

    const weeklySlice = dailyData.slice(0, 7);

    for (const [index, day] of weeklySlice.entries()) {
        const date = new Date(day.dt * 1000);
        const dayIndex = date.getDay();

        const label = index === 0 ? "Hoy" : dayNames[dayIndex];

        if (!label) {
            throw new Error(
                "No se asignaron etiquetas para los días de semana"
            );
        }

        processedData.labels.push(label);
        processedData.maxTemps.push(Math.round(day.temp.max));
        processedData.minTemps.push(Math.round(day.temp.min));
    }

    return processedData;
}

// Función orquestadora que transforma la respuesta cruda en datos limpios
export function normalizeWeatherData(
    apiData: OpenWeatherMapResponse
): NormalizedWeatherData {
    const { timezone, current, hourly, daily } = apiData;

    return {
        timezone: timezone,
        current: normalizeCurrentData(current, timezone),
        hourly: normalizeHourlyForecast(hourly, timezone),
        daily: normalizeDailyForecast(daily)
    };
}
