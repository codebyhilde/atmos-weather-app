import { WeatherIcon } from "./WeatherIcon";

interface HourlyWeatherForecast {
    time: string;
    weatherCode: string;
    temp: number;
}

interface HourlyForecastProps {
    hourlyForecast: HourlyWeatherForecast[];
}

export function HourlyForecast({ hourlyForecast }: HourlyForecastProps) {
    return (
        <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Pronóstico por Hora</h3>
            <div className="relative">
                <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
                    {hourlyForecast.map((forecast, index) => (
                        <div
                            className="glass-card flex-shrink-0 w-24 text-center p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-xl"
                            key={index}
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                {forecast.time}
                            </p>

                            <div className="flex justify-center mb-2">
                                <WeatherIcon
                                    code={forecast.weatherCode}
                                    className="w-8 h-8 text-sky-500 dark:text-sky-300"
                                />
                            </div>

                            <div className="text-xl font-semibold text-gray-900 dark:text-white">
                                {forecast.temp}°
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
