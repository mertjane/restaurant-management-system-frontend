export interface sidebarProps {
    isSidebarOpen: boolean;
    selectedPeople: { [key: string]: boolean };
    selectedStatus: {[key: string]: boolean};
    selectedTime: {
        startTime: string;
        endTime: string;
      };
    selectedDate: {
        startDate: string;
        endDate: string;
      }
    onCheckboxChange: (custName: string) => void; 
    onStatsChange: (status: string) => void;
    onTimeRangeChange: (startTime: string, endTime: string) => void;
    onDateRangeChange: (startDate: string, endDate: string) => void;
    clearSelectedPeople: () => void;
    clearSelectedStatus: () => void;
    clearSelectedTimeRange: () => void;
    clearSelectedDateRange: () => void;
}