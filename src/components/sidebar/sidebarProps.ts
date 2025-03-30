export interface sidebarProps {
    isSidebarOpen: boolean;
    selectedPeople: { [key: string]: boolean };
    onCheckboxChange: (custName: string) => void; 
    clearSelectedPeople: () => void;
}