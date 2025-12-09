export interface HourlyForecast {
    time: string;
    temp: number;
    weatherCode: string;
}

// Datos del pronóstico semanal
export interface DailyForecast {
    labels: string[];
    maxTemps: number[];
    minTemps: number[];
}

// Datos actuales del clima
export interface CurrentData {
    hour: string;
    temp: number;
    description: string;
    weatherCode: string;
    humidity: number;
    wind_speed: number;
    pressure: number;
}

// Interfaz principal
export interface CompleteWeatherData {
    timezone: string;
    current: CurrentData;
    hourly: HourlyForecast[];
    daily: DailyForecast;
}