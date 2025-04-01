export interface PeopleCheckboxProps {
    selectedPeople: { [key: string]: boolean }; 
    onCheckboxChange: (custName: string) => void; 
}

export interface StatusCheckboxProps {
    selectedStatus: { [key: string]: boolean }; 
    onStatsChange: (status: string) => void; 
}

export interface SelectedTimeRangeProps {
    selectedTime: {
        startTime: string;
        endTime: string;
      };
    onTimeRangeChange: (startTime: string, endTime: string) => void;
}