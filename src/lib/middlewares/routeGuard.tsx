import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface RouteGuardProps {
  children: React.ReactElement;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const user = useSelector((state: RootState) => state.auth?.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RouteGuard;
