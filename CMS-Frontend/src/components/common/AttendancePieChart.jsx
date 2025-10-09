// components/AttendancePieChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"]; 

const AttendancePieChart = ({ totalDays = 0, presentDays = 0 }) => {
  const absentDays = totalDays - presentDays;

  const data = [
    { name: "Present", value: presentDays },
    { name: "Absent", value: absentDays },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl border w-full md:w-1/2">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">
        Attendance Overview
      </h2>

      {totalDays > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 mt-4 text-center">
          No attendance data available.
        </p>
      )}
    </div>
  );
};

export default AttendancePieChart;
