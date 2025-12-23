import { Search } from "lucide-react";

interface LocationSearchButtonProps {
    isDisabled: boolean;
}

export function LocationSearchButton({
    isDisabled
}: LocationSearchButtonProps) {
    return (
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
    );
}
