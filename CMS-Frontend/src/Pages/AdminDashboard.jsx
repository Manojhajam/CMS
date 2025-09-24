import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { makeApiRequest } from "../lib/api";
import DashboardCard from "../components/DashboardCard";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);

  const { user } = useContext(AuthContext); // ✅ Get user from context



  useEffect(() => {
   
  }, []);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">This is Admin Dashboard</h1>
      <p className="mt-2 text-lg">
        Welcome, <span className="font-semibold">{user.name}</span> 🎉
      </p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default AdminDashboard;
