import React from "react";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-around items-center h-18">
        <div className="text-3xl font-bold">EduManage</div>
        <div className="flex gap-4">
          <button className="px-4 py-1 border-2 border-gray-4   00 text-black-600 font-bold rounded-xl hover:bg-gray-200 transition-all duration-300">
            Sign In
          </button>
          <Link to={"/register"}>
          <button className="px-4 py-1 bg-black text-white font-medium rounded-xl shadow-md hover:bg-gray-700 hover:shadow-lg transition-all duration-300">
            Sign Up
          </button> 
          </Link>
        </div>
      </div>

      {/* Pages */}
      <div className="bg-blue-200 min-h-screen">
        <div className="pt-14">
          <h1 className="text-6xl font-semibold text-center">
            Modern College Management System
          </h1>
        </div>
        <div className="mt-5">
          <p className="text-center text-2xl text-gray-600">
            Streamline your academic operations with our comprehensive platform{" "}
            <br />
            designed for students, faculty, and administrators.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
