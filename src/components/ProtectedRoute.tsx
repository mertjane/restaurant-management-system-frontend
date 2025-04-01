import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ProtectedRoute = () => {
  const token = useSelector((state: RootState) => state.auth.token) || localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
