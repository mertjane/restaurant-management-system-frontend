export interface searchBarProps {
    searchInput: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}
