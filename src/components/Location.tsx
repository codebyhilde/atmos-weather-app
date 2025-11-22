interface LocationProps {
    city: string;
    country: string;
    state?: string;
    hour: string;
}

export function Location({ city, country, state, hour }: LocationProps) {
    const locationDisplay = state
        ? `${city}, ${state}, ${country}`
        : `${city}, ${country}`;

    return (
        <section className="text-center mb-6">
            <h2 className="text-2xl font-semibold">{locationDisplay}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{hour}</p>
        </section>
    );
}
