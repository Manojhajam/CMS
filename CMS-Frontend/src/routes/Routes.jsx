import React from "react";
import { Route, Routes } from "react-router";
import LandingPage from "../Pages/LandingPage";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default PageRoutes;
