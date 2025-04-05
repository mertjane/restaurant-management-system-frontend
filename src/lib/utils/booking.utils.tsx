import {
  PendingIcon,
  SuccessIcon,
  CancelledIcon,
} from "../../components/icons/Icons";

// Function for format the date string
export const formatDate = (dateString?: string): string => {
  if (!dateString) return "N/A"; // Handle undefined case
  try {
    // Parse the date string (assuming it's in ISO format)
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  } catch {
    return "Invalid Date";
  }
};

// Function to render booking status icon
export const getStatusIcon = (status: string) => {
  switch (status) {
    case "Pending":
      return <PendingIcon />;
    case "Confirmed":
      return <SuccessIcon />;
    case "Cancelled":
      return <CancelledIcon />;
    default:
      return null; // Default color
  }
};
