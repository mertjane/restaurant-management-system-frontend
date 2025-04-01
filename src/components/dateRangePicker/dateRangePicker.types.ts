export interface dateRangePickerProps {
    selectedDate: {
        startDate: string;
        endDate: string;
      }
    onDateRangeChange: (startDate: string, endDate: string) => void;
}