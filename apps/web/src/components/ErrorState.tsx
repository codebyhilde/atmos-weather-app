interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in-up">
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-red-100 dark:bg-red-900/30 rounded-full transform scale-150 opacity-50 animate-pulse"></div>

                <svg
                    className="w-16 h-16 text-red-500 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Ups, algo salió mal
            </h2>

            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
                {message}
            </p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-2.5 rounded-full text-white font-medium bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-lg shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    Intentar de nuevo
                </button>
            )}
        </div>
    );
}
