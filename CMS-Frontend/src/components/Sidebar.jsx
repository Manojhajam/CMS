import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const {user, setUser} = useContext(AuthContext)

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser(null)
  }
 const navLinkClass = ({ isActive }) =>
   `px-4 py-3 text-lg rounded-lg transition-colors duration-200 ${
     isActive
       ? "bg-[#8EA4D2] text-white font-semibold shadow-md"
       : "text-gray-200 hover:bg-[#8EA4D2]/40 hover:text-gray-900"
   }`;

  return (
    <nav className="fixed w-[250px] h-[100vh] bg-gray-700 p-3 flex flex-col justify-between">
      <div>
        <h3 className="text-3xl font-bold mb-4 p-4 text-white">CMS</h3>
        <div className="flex flex-col gap-2">
          <NavLink className={navLinkClass} to={"/sidebar"}>
            Dashboard
          </NavLink>

          {user?.role === "admin" && (
            <NavLink className={navLinkClass} to={"/sidebar/addstaff"}>
              Manage Faculty
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink className={navLinkClass} to={"/sidebar/managestudent"}>
              Manage Student
            </NavLink>
          )}

          {user?.role !== "student" && (
            <NavLink className={navLinkClass} to={"/sidebar/attendance"}>
              Attendance
            </NavLink>
          )}

          <NavLink className={navLinkClass} to={"/sidebar/courses"}>
            Courses
          </NavLink>
          <NavLink className={navLinkClass} to={"/sidebar/notification"}>
            Notification
          </NavLink>
          <NavLink className={navLinkClass} to={"/sidebar/profile"}>
            Profile
          </NavLink>
        </div>
      </div>
      <button
        onClick={handleLogOut}
        className="flex justify-center items-center p-3 rounded-lg bg-gradient-to-tl bg-pink-500 to-green-500 cursor-pointer hover:bg-red-800"
      >
        <FiLogOut />
        Log Out
      </button>
    </nav>
  );
};

export default Sidebar;
