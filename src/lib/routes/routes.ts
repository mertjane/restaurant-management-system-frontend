export const ROUTES = {
  LOGIN: "/login",
  ROOT: "/",
  DASHBOARD: "/dashboard",
  CUSTOMERS: "/dashboard/customers",
  /* BOOKINGS: "/dashboard/bookings", */
  /* 
  MENU: "/dashboard/menu", */
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];


