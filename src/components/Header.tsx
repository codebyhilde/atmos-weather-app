interface HeaderProps {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export function Header({ theme, toggleTheme }: HeaderProps) {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-3xl font-extrabold mb-3 sm:mb-0 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 dark:from-sky-300 dark:to-indigo-400">
                Atmos
            </h1>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Buscar ciudad..."
                        className="w-full px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-indigo-500 transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        🔍
                    </span>
                </div>

                <button className="flex-shrink-0 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" onClick={toggleTheme}>
                    <span>{theme === "dark" ? "🌙" : "☀️"}</span>
                </button>
            </div>
        </header>
    );
}
