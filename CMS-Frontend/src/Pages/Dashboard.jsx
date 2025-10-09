// Student Dashboard


import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { makeApiRequest } from "../lib/api";
import DashboardCard from "../components/DashboardCard";
import AttendancePieChart from "../components/common/AttendancePieChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState([]) 



  const { user } = useContext(AuthContext); // ✅ Get user from context

  const totalAttendenace = async () => {
    try {
      const { response, error } = await makeApiRequest({
        endpoint: "/students/attendance",
      });

      // console.log("response",response);

      if (error) {
        setLoading(false);
        console.log(error);
        return;
      }
      
      if (response.success) {
        setLoading(false)
        setAttendance(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }
  // console.log("att",attendance);

  useEffect(() => {
    totalAttendenace();
  },[])

  if (!user) {
    return <div>Loading user data...</div>;
  } 

  return (
    <>
      <div className="bg-white p-4 shadow-lg">
        <h1 className="text-3xl text-gray-700">
          College Management System | Student Dashboard
        </h1>
      </div>
      <div className="p-4">
        <h1 className="text-4xl font-bold underline text-gray-700">
          Dashboard
        </h1>

        <div className="flex gap-10 mt-5">
          <DashboardCard
            title={"Total attendance"}
            data={attendance?.totalDays}
            customClass={"bg-blue-500"}
          />
          <DashboardCard
            title={"Present"}
            data={attendance?.presentDays}
            customClass={"bg-green-400"}
          />
          <DashboardCard
            title={"Absent"}
            data={(attendance?.totalDays ?? 0) - (attendance?.presentDays ?? 0)}
            customClass={"bg-red-400"}
          />
        </div>

        {/* Attendance Pie Chart */}
        <div className="mt-10 flex justify-center">
          <AttendancePieChart
            totalDays={attendance?.totalDays ?? 0}
            presentDays={attendance?.presentDays ?? 0}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
