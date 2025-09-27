import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { makeApiRequest } from "../lib/api";
import DashboardCard from "../components/DashboardCard";

const AdminDashboard = () => {
  const [student, setStudent] = useState([])


  const getStudent = async () => {
    const { response, error } = await makeApiRequest({
      endpoint: "/admin/countdata",
    });

    if (error) {
      console.log(error);
      return;
    }

    console.log(response)

    if (response.success) {
      setStudent(response?.data)
    }
  }

  const { user } = useContext(AuthContext); // ✅ Get user from context

  useEffect(() => {
    getStudent()
  }, []);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="bg-emerald-100 h-screen">
      <div className="bg-white p-4 ">
        <h1 className="text-3xl text-gray-700">
          Student Management System | Admin Dashboard
        </h1>
      </div>
      <div className="flex gap-5 mt-8 mx-2">
        <DashboardCard title={"Total Students"} data={student?.studentCount} />
        <DashboardCard title={"Total Faculty"} data={student?.facultyCount} />
        <DashboardCard title={"Total Course"} data={student?.courseCount} />
      </div>
    </div>
  );
};

export default AdminDashboard;
