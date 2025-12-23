import React, { useState, useEffect } from "react";
import { countryList } from "../data/countries";
import { usStateList } from "../data/usStates";
import type { LocationQuery } from "../interfaces/locationQuery";

interface useSearchArgs {
    onSearch: (query: LocationQuery) => void;
}

export function useSearch({ onSearch }: useSearchArgs) {
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

    return {
        city,
        setCity,
        countryName,
        setCountryName,
        stateName,
        setStateName,
        errors,
        setErrors,
        showStates,
        isDisabled,
        validateField,
        handleSubmit,
        countryList,
        usStateList
    };
}
