import type { LocationQuery } from "../interfaces/locationQuery";
import { useSearch } from "../hooks/useSearch";
import { Search } from "lucide-react";

interface LocationSearchProps {
    onSearch: (query: LocationQuery) => void;
}

export function LocationSearch({ onSearch }: LocationSearchProps) {
    const {
        city,
        setCity,
        countryName,
        setCountryName,
        stateName,
        setStateName,
        errors,
        showStates,
        isDisabled,
        validateField,
        handleSubmit,
        countryList,
        usStateList
    } = useSearch({ onSearch });

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-4 w-full mb-6 sm:mb-0"
        >
            {" "}
            <div
                className={`relative w-full sm:flex-1 ${
                    errors.city ? "mb-6 sm:mb-0" : "mb-0"
                }`}
            >
                <input
                    type="text"
                    value={city}
                    onChange={e => {
                        setCity(e.target.value);
                        validateField("city", e.target.value);
                    }}
                    placeholder="Caracas"
                    className="w-full px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {errors.city && (
                    <span className="absolute -bottom-5 left-4 text-red-500 text-xs truncate w-full">
                        {errors.city}
                    </span>
                )}
            </div>
            <div
                className={`relative w-full sm:flex-1 ${
                    errors.country ? "mb-6 sm:mb-0" : "mb-0"
                }`}
            >
                <input
                    type="text"
                    value={countryName}
                    onChange={e => {
                        setCountryName(e.target.value);
                        validateField("country", e.target.value);
                    }}
                    placeholder="Venezuela"
                    list="country-list"
                    className="w-full px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {errors.country && (
                    <span className="absolute -bottom-5 left-4 text-red-500 text-xs truncate w-full">
                        {errors.country}
                    </span>
                )}
                <datalist id="country-list">
                    {countryList.map(c => (
                        <option key={c.code} value={c.name} />
                    ))}
                </datalist>
            </div>
            {showStates && (
                <div
                    className={`relative w-full sm:flex-1 ${
                        errors.state ? "mb-6 sm:mb-0" : "mb-0"
                    }`}
                >
                    <input
                        type="text"
                        value={stateName}
                        onChange={e => {
                            setStateName(e.target.value);
                            validateField("state", e.target.value);
                        }}
                        placeholder="Florida"
                        list="state-list"
                        className="w-full px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <datalist id="state-list">
                        {usStateList.map(s => (
                            <option key={s.code} value={s.name} />
                        ))}
                    </datalist>
                    {errors.state && (
                        <span className="absolute -bottom-5 left-4 text-red-500 text-xs truncate w-full">
                            {errors.state}
                        </span>
                    )}
                </div>
            )}
            <button
                type="submit"
                className={`flex-shrink-0 p-2 rounded-full ${
                    isDisabled
                        ? "bg-gray-500 text-white cursor-not-allowed"
                        : "bg-sky-500 transition-colors text-white hover:bg-sky-600"
                }`}
                disabled={isDisabled}
            >
                <Search className="w-5 h-5" />
            </button>
        </form>
    );
}
