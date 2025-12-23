interface LocationSearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    error?: string;
    listId?: string;
    options?: Array<{ code: string; name: string }>;
}

export function LocationSearchInput({
    value,
    onChange,
    placeholder,
    error,
    listId,
    options
}: LocationSearchInputProps) {
    return (
        <div className={`relative w-full sm:flex-1 ${error ? "mb-6 sm:mb-0" : "mb-0"}`}>
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                list={listId}
                className="w-full px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {error && (
                <span className="absolute -bottom-5 left-4 text-red-500 text-xs truncate w-full">
                    {error}
                </span>
            )}
            {options && listId && (
                <datalist id={listId}>
                    {options.map(option => (
                        <option key={option.code} value={option.name} />
                    ))}
                </datalist>
            )}
        </div>
    );
}