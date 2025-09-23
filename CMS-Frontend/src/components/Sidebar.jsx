import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/authContext";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const {user, setUser} = useContext(AuthContext)

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser(null)
  }
  return (
    <nav className="fixed w-[250px] h-[100vh] bg-gray-200 p-3 flex flex-col justify-between">
      <div>
        <h3 className="text-3xl font-bold mb-4 p-4">CMS</h3>
        <div className="flex flex-col gap-2">
          <NavLink
            className="px-4 py-4 text-lg rounded-lg hover:bg-[#8EA4D2] hover:text-white"
            to={"/sidebar"}
          >
            Dashboard
          </NavLink>

          <NavLink
            className="px-4 py-4 text-lg rounded-lg hover:bg-[#8EA4D2] hover:text-white"
            to="/sidebar/profile"
          >
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
