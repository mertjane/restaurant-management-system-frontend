export interface checkboxProps {
    selectedPeople: { [key: string]: boolean }; 
    onCheckboxChange: (custName: string) => void; 
    clearSelectedPeople: {}
}