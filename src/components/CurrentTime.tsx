interface CurrentTimeProps {
    iconCode: string;
    tempCelsius: number;
    weatherInfo: string;
}

export function CurrentTime({
    iconCode,
    tempCelsius,
    weatherInfo
}: CurrentTimeProps) {
    const url = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    
    return (
        <section className="text-center mb-8">
            <div className="flex justify-center mb-4">
                <img className="h-24 w-auto" src={url} alt={`${weatherInfo}`} />
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
