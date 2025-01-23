import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token is found, redirect to the home page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If a token is present, render the protected content
  return children;
};

export default ProtectedRoute;
