// Sorting util function
export const getBookingSortParams = (sort: string): { sortBy: 'date'; direction: 'asc' | 'desc'; sortType?: 'today_to_future' } => {
  switch (sort) {
    case "oldest":
      return { sortBy: "date", direction: "asc" };
    case "newest":
      return { sortBy: "date", direction: "desc" };
    case "today_to_future":
      return { sortBy: "date", direction: "desc", sortType: "today_to_future" };
    default:
      return { sortBy: "date", direction: "desc" };
  }
};


export const formatBookingDate = (date: string | undefined) => {
  if (!date) return "";
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-GB"); // This formats it as DD/MM/YYYY
};

export const formatBookingTime = (time: string | undefined) => {
  if (!time) return "";

  const [hrs, mins] = time.split(":");
  return `${hrs}:${mins}`;
}

