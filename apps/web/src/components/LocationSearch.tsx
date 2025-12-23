import { LocationSearchInput } from "./LocationSearchInput";
import { LocationSearchButton } from "./LocationSearchButton";
import { useSearch } from "../hooks/useSearch";
import type { LocationQuery } from "../interfaces/locationQuery";

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
            <LocationSearchInput
                value={city}
                onChange={value => {
                    setCity(value);
                    validateField("city", value);
                }}
                placeholder="Caracas"
                error={errors.city}
            />

            <LocationSearchInput
                value={countryName}
                onChange={value => {
                    setCountryName(value);
                    validateField("country", value);
                }}
                placeholder="Venezuela"
                error={errors.country}
                listId="country-list"
                options={countryList}
            />

            {showStates && (
                <LocationSearchInput
                    value={stateName}
                    onChange={value => {
                        setStateName(value);
                        validateField("state", value);
                    }}
                    placeholder="Florida"
                    error={errors.state}
                    listId="state-list"
                    options={usStateList}
                />
            )}

            <LocationSearchButton isDisabled={isDisabled} />
        </form>
    );
}
