import { WeatherIcon } from "./WeatherIcon";

interface CurrentTimeProps {
    weatherCode: string;
    tempCelsius: number;
    weatherInfo: string;
}

export function CurrentTime({
    weatherCode,
    tempCelsius,
    weatherInfo
}: CurrentTimeProps) {
    return (
        <section className="text-center mb-8">
            <div className="flex justify-center mb-4">
                <WeatherIcon
                    code={weatherCode}
                    className="w-24 h-24 text-sky-500 dark:text-sky-300"
                />
            </div>
            <div className="text-7xl font-bold">
                {tempCelsius}
                <span className="text-5xl align-top">°C</span>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-300">
                {weatherInfo}
            </p>
        </section>
    );
}
