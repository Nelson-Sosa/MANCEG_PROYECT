import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export const ProtectedRoutes = () => {
  const token = cookie.get("token");
  if (!token) {
    return <Navigate to="/welcome" />;
  }
  return <Outlet />;
};
