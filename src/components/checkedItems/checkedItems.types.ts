export interface checkedItemsProps {
    selectedPeople: { [key: string]: boolean };
    clearSelectedPeople: () => void;
}