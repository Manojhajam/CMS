import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import LandingPage from "../Pages/LandingPage";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Layout from "./Layout";
import Profile from "../Pages/Profile";
import ProtectedRoutes from "./ProtectedRoutes";
import { AuthContext } from "../context/authContext.jsx";
import AdminDashboard from "../Pages/AdminDashboard";
import FacultyDashboard from "../Pages/FacultyDashboard";
import AddStaff from "../components/admin/AddStaff";
import ManageStudent from "../components/admin/ManageStudent";
import Attendance from "../Pages/Attendance.jsx";

const PageRoutes = () => {

  const {user, setUser} = useContext(AuthContext)
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/sidebar" element={<Layout />}>
        <Route element={<ProtectedRoutes />}>
          <Route
            index
            element={
              user?.role === "admin" ? (
                <AdminDashboard />
              ) : user?.role === "faculty" ? (
                <FacultyDashboard />
              ) : (
                <Dashboard />
              )
            }
          />
          <Route path="addstaff" element={user?.role === "admin"? (<AddStaff />) : ""} />
          <Route path="managestudent" element={user?.role === "admin" ? (<ManageStudent />) : ""} />
          <Route path="attendance" element={user?.role !== "student"? <Attendance/> : "" } />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PageRoutes;
