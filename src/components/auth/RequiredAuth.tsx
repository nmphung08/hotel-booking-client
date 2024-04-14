import { Navigate, useLocation } from "react-router-dom";

export default function RequiredAuth({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
}
