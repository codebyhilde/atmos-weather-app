export function Loader() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full rounded-full bg-sky-400 opacity-20 animate-ping"></div>
                <div className="w-16 h-16 border-4 border-sky-200 border-t-indigo-600 rounded-full animate-spin dark:border-gray-700 dark:border-t-sky-400"></div>
            </div>
            <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300 animate-pulse">
                Cargando clima...
            </p>
        </div>
    );
}
