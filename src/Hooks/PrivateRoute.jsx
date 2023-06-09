import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "./useAuthStatus";


export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return toast.success("Do You Have The Access ");
  }
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
}
