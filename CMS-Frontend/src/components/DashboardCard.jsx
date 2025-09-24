import React from "react";

const DashboardCard = ({ title, data }) => {

  return (
    <div className="bg-green-400 py-4 w-full px-4 rounded-lg">
     
        <div className="flex items-center gap-40">
          <div>
            <p className="text-sm font-semibold">{title}</p>
            <h3 className="text-3xl m-0 p-0 font-bold">{data}</h3>
          </div>
        </div>
      
    </div>
  );
};

export default DashboardCard;
