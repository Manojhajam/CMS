import React from 'react'
import { useContext } from 'react'
import { MemberContext } from '../context/memberContext'
import { useState } from 'react';
import { useEffect } from 'react';
import { makeApiRequest } from '../lib/api';
import { AuthContext } from '../context/AuthContext';

const Attendance = () => {
    const [Studentlist, setStudentlist] = useState([]);
  const [loading, setLoading] = useState("");
  const {user} = useContext(AuthContext)
    
    
          const getStudent = async () => {
            setLoading(true);
            const { response, error } = await makeApiRequest({
              endpoint: "/admin/faculty",
            });
            console.log(response);
            setLoading(false);
        
            if (error) return;
        
            if (response.success) {
              setStudentlist(response.student)
            }
    };

    const markAttendance = async (studentId, status) => {
        const { response, error } = await makeApiRequest({
            endpoint: "/admin/attendance",
            method: "PUT",
            body: {
                studentId:studentId, status:status
            }       
        })
        if (error) {
            console.log(error)
            return;
        }
        if (response.success) {
          // Update state immediately with new data
          setStudentlist((prev) =>
            prev.map((stu) =>
              stu._id === studentId
                ? { ...stu, attendance: response.data.attendance }
                : stu
            )
          );
        }
    }
    
    useEffect(() => {
        getStudent();
    },[])
  return (
    <div>
      <div className="bg-white p-4 shadow-lg">
        {user?.role === "admin" ? (
          <h1 className="text-3xl text-gray-700">
            College Management System | Admin Dashboard
          </h1>
        ) : (
          <h1 className="text-3xl text-gray-700">
            College Management System | Faculty Dashboard
          </h1>
        )}
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Mark Attendance</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2">Name</th>
              <th className="border border-gray-300 px-3 py-2">Roll No</th>
              <th className="border border-gray-300 px-3 py-2">Present Days</th>
              <th className="border border-gray-300 px-3 py-2">Total Days</th>
              <th className="border border-gray-300 px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {Studentlist?.map((student) => (
              <tr key={student._id}>
                <td className="border border-gray-300 px-3 py-2 font-semibold \">
                  {student.userId?.name || "N/A"}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  {student.rollNumber}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  {student.attendance.presentDays}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  {student.attendance.totalDays}
                </td>
                <td className="border border-gray-300 px-3 py-2 flex gap-2 items-center justify-center">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      markAttendance(student._id, "present");
                    }}
                  >
                    Present
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      markAttendance(student._id, "absent");
                    }}
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance