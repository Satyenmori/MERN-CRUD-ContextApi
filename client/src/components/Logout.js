import { useEffect } from "react";
import { useAuth } from "../store/store";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const { logoutUser } = useAuth();

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Navigate to="/login" />;
};

export default Logout;
