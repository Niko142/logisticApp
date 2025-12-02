import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    return <Navigate to={"/app"} replace />;
  }
  return <Outlet />;
};
