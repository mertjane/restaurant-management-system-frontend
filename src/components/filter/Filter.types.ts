export interface FilterProps {
    selectedDate: {
        startDate: string;
        endDate: string;
    };
    selectedTime: {
        startTime: string;
        endTime: string;
      };
    selectedPeople: { [key: string]: boolean };
    selectedStatus: { [key: string]: boolean};
    onCheckboxChange: (custName: string) => void; 
    onStatsChange: (status: string) => void;
    onTimeRangeChange: (startTime: string, endTime: string) => void;
    onDateRangeChange: (startDate: string, endDate: string) => void;
    clearSelectedPeople: () => void;
    clearSelectedStatus: () => void;
    clearSelectedTimeRange: () => void;
    clearSelectedDateRange: () => void;
}