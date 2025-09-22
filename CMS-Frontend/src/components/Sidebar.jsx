import React from "react";
import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <nav className="fixed w-[250px] h-[100vh] bg-gray-200 p-3 flex flex-col justify-between">
      <div>
        <h3 className="text-3xl font-bold mb-4 p-4">CMS</h3>
        <div className='className="flex flex-col gap-2'>
          <NavLink to={"/sidebar"}>Dashboard</NavLink>

          <NavLink
            className="px-4 py-4 text-lg rounded-lg hover:bg-[#8EA4D2] hover:text-white"
            to="/sidebar/profile"
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
