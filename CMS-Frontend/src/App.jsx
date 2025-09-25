import React from "react";
import { BrowserRouter } from "react-router";
import AuthProvider from "./context/authContext";
import MemberProvider from "./context/memberContext";
import PageRoutes from "./routes/Routes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <AuthProvider>
        <MemberProvider>
          <BrowserRouter>
            <PageRoutes />
          </BrowserRouter>
        </MemberProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
