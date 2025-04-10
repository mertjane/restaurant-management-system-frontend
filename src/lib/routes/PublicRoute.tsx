import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routes";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  return !token ? <Outlet /> : <Navigate to={ROUTES.DASHBOARD} replace />;
};

export default PublicRoute;
