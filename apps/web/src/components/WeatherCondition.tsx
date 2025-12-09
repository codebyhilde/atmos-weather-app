import { Wind, Droplet, Thermometer } from "lucide-react";

interface WeatherConditionProps {
    humidity: number;
    windSpeedKph: number;
    pressure: number;
}

export function WeatherCondition({
    humidity,
    windSpeedKph,
    pressure
}: WeatherConditionProps) {
    return (
        <section className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
            <div className="glass-card text-center p-4 rounded-2xl shadow-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Humedad
                </p>
                <div className="text-2xl font-semibold">
                    <div className="flex justify-center mb-2">
                        <Droplet className="text-sky-500 dark:text-sky-300" />
                    </div>
                    <span>{humidity}%</span>
                </div>
            </div>
            <div className="glass-card text-center p-4 rounded-2xl shadow-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Viento
                </p>
                <div className="text-2xl font-semibold">
                    <div className="flex justify-center mb-2">
                        <Wind className="text-gray-500 dark:text-gray-300" />
                    </div>

                    <span>{windSpeedKph} km/h</span>
                </div>
            </div>
            <div className="glass-card text-center p-4 rounded-2xl shadow-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Presión
                </p>
                <div className="text-2xl font-semibold">
                    <div className="flex justify-center mb-2">
                        <Thermometer className="text-red-500 dark:text-red-300" />
                    </div>
                    <span>{pressure} hPa</span>
                </div>
            </div>
        </section>
    );
}
