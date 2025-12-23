import React, { useState, useEffect } from "react";
import { countryList } from "../data/countries";
import { usStateList } from "../data/usStates";
import type { LocationQuery } from "../interfaces/locationQuery";
import { Search } from "lucide-react";

interface LocationSearchProps {
    onSearch: (query: LocationQuery) => void;
}

export function LocationSearch({ onSearch }: LocationSearchProps) {
    const [city, setCity] = useState("");
    const [countryName, setCountryName] = useState("");
    const [stateName, setStateName] = useState("");
    const [errors, setErrors] = useState({
        city: "",
        country: "",
        state: ""
    });

    const showStates = countryName === "Estados Unidos";

    // Controla si el botón estará o no activo
    const isDisabled =
        !!errors.city ||
        !!errors.country ||
        (showStates && !!errors.state) ||
        !city ||
        !countryName ||
        (showStates && !stateName);

    // Eliminar input y errores de estado cuando ya no son necesarios
    useEffect(() => {
        if (!showStates) {
            setStateName("");
            setErrors(prev => ({ ...prev, state: "" }));
        }
    }, [showStates]);

    // Función para validación en tiempo real
    const validateField = (name: string, value: string) => {
        let error = "";

        if (name === "city" && !value.trim()) {
            error = "La ciudad es requerida";
        } else if (name === "country" && !value.trim()) {
            error = "El país es requerido";
        } else if (name === "state" && showStates && !value.trim()) {
            error = "Requerido para EE.UU.";
        }

        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const selectedCountry = countryList.find(c => c.name === countryName);

        if (!city || !selectedCountry) {
            alert("Por favor, introduce una ciudad y un país de la lista.");
            return;
        }

        let selectedStateCode: string | undefined = undefined;

        if (showStates && stateName) {
            const selectedState = usStateList.find(s => s.name === stateName);
            selectedStateCode = selectedState?.code;
        }

        onSearch({
            city,
            countryCode: selectedCountry.code,
            stateCode: selectedStateCode,
            countryName: selectedCountry.name,
            stateName: showStates ? stateName : undefined
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full"
        >
            <input
                type="text"
                value={city}
                onChange={e => {
                    setCity(e.target.value);
                    validateField("city", e.target.value);
                }}
                placeholder="Caracas"
                className="w-full sm:w-auto px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.city && (
                <span className="text-red-500 text-sm">{errors.city}</span>
            )}
            <input
                type="text"
                value={countryName}
                onChange={e => {
                    setCountryName(e.target.value);
                    validateField("country", e.target.value);
                }}
                placeholder="Venezuela"
                list="country-list"
                className="w-full sm:w-auto px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.country && (
                <span className="text-red-500 text-sm">{errors.country}</span>
            )}
            <datalist id="country-list">
                {countryList.map(c => (
                    <option key={c.code} value={c.name} />
                ))}
            </datalist>

            {showStates && (
                <>
                    <input
                        type="text"
                        value={stateName}
                        onChange={e => {
                            setStateName(e.target.value);
                            if (showStates) {
                                validateField("state", e.target.value);
                            }
                        }}
                        placeholder="Florida"
                        list="state-list"
                        className="w-full sm:w-auto px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <datalist id="state-list">
                        {usStateList.map(s => (
                            <option key={s.code} value={s.name} />
                        ))}
                    </datalist>
                </>
            )}
            {showStates && errors.state && (
                <span className="text-red-500 text-sm mt-1">
                    {errors.state}
                </span>
            )}
            <button
                type="submit"
                className={
                    isDisabled
                        ? "flex-shrink-0 p-2 rounded-full bg-gray-500 text-white cursor-not-allowed"
                        : "flex-shrink-0 p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                }
                disabled={isDisabled}
            >
                <Search />
            </button>
        </form>
    );
}
