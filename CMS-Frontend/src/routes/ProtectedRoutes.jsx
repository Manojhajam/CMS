import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate, Outlet } from "react-router";
import Loader from "../components/common/Loader";

const ProtectedRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} replace />;
  }
};

export default ProtectedRoutes;
