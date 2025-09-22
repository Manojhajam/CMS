import React from "react";
import { Route, Routes } from "react-router";
import LandingPage from "../Pages/LandingPage";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Layout from "./Layout";
import Profile from "../Pages/Profile";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/sidebar" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PageRoutes;
