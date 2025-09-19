import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext); // ✅ Get user from context

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-lg">
        Welcome, <span className="font-semibold">{user.name}</span> 🎉
      </p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Dashboard;
