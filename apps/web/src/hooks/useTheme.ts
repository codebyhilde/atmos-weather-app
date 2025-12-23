import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem("theme") as Theme) || "light";
        }

        return "light";
    });

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const root = window.document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme]);

    return { theme, toggleTheme };
}
