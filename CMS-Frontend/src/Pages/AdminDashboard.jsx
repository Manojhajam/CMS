import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { makeApiRequest } from "../lib/api";
import DashboardCard from "../components/DashboardCard";

const AdminDashboard = () => {


  const NoofStudent =async () => {
    const { response, error } = await makeApiRequest({
      endpoint: "/"
    })
  }

  const { user } = useContext(AuthContext); // ✅ Get user from context

  useEffect(() => {}, []);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="bg-emerald-100 h-screen">
      <div className="bg-white p-4 ">
        <h1 className="text-3xl text-gray-700">Student Management System | Admin Dashboard</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
