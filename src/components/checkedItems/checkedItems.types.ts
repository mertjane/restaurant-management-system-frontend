export interface checkedItemsProps {
    selectedPeople: { [key: string]: boolean };
    clearSelectedPeople: () => void;
}


export interface CheckedStatsProps {
    selectedStatus: { [key: string]: boolean};
    clearSelectedStatus: () => void;
}


export interface SelectedTimeProps {
    selectedTime: {
        startTime: string;
        endTime: string;
      };
    clearSelectedTimeRange: () => void;
}

export interface SelectedDateProps {
    selectedDate: {
        startDate: string;
        endDate: String;
    };
    clearSelectedDateRange: () => void;
}