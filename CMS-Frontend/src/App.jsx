import React from "react";
import { BrowserRouter } from "react-router";
import AuthProvider from "./context/authContext";
import PageRoutes from "./routes/Routes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <PageRoutes />
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
