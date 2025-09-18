import React from "react";
import { Route, Routes } from "react-router";
import LandingPage from "../Pages/LandingPage";
import Register from "../Pages/Register";


const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register/>}/>
    </Routes>
  );
};

export default PageRoutes;
