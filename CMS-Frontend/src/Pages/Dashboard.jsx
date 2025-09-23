import React, { useContext,useEffect,useState } from "react";
import { AuthContext } from "../context/authContext";
import { makeApiRequest } from "../lib/api";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState([]) 



  const { user } = useContext(AuthContext); // ✅ Get user from context

  const totalAttendenace = async () => {
    try {
      const { response, error } = await makeApiRequest({
        endpoint: "/students/attendance",
      });

      console.log(response);

      if (error) {
        setLoading(false);
        console.log(error);
        return;
      }
      console.log(response);
      if (response.success) {
        setAttendance(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    totalAttendenace();
  },[])

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
