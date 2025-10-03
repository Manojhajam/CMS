import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { makeApiRequest } from "../lib/api";
import DashboardCard from "../components/DashboardCard";

const FacultyDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);

  const { user } = useContext(AuthContext); // ✅ Get user from context



  useEffect(() => {
   
  }, []);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <div className="bg-white p-4 shadow-lg">
        <h1 className="text-3xl text-gray-700">
          Student Management System | Faculty Dashboard
        </h1>
      </div>
      <div className="p-4">
        <h1 className="text-3xl font-bold">This is Faculty Dashboard</h1>
        <p className="mt-2 text-lg">
          Welcome, <span className="font-semibold">{user.name}</span> 🎉
        </p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default FacultyDashboard;
