export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  /* const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0"); */

  return `${day}/${month}/${year}`;
}

// Sorting util function
export const getSortParams = (sort: string): { sortBy: 'name' | 'id' | 'createdAt'; direction: 'asc' | 'desc' } => {
  switch (sort) {
    case "name_asc":
      return { sortBy: "name", direction: "asc" };
    case "name_desc":
      return { sortBy: "name", direction: "desc" };
    case "oldest":
      return { sortBy: "createdAt", direction: "asc" };
    case "newest":
      return { sortBy: "createdAt", direction: "desc" };
    default:
      return { sortBy: "createdAt", direction: "desc" };
  }
};