import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { makeApiRequest } from "../lib/api";
import Card from "../components/common/Card";

const Courses = () => {
  const { user } = useContext(AuthContext);
  const [courseList, setCourseList] = useState([]);

  const getCourse = async () => {
    try {
      const { response, error } = await makeApiRequest({
        endpoint: "/courses",
      });

      console.log("courses", response.data[0]);

      if (error) {
        console.log(error);
        return;
      }
      if (response.success) {
        setCourseList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourse();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="bg-white p-4 shadow-lg">
        {user?.role === "admin" ? (
          <h1 className="text-3xl text-gray-700">
            Student Management System | Admin Dashboard
          </h1>
        ) : user?.role === "faculty" ? (
          <h1 className="text-3xl text-gray-700">
            Student Management System | Faculty Dashboard
          </h1>
        ) : (
          <h1 className="text-3xl text-gray-700">
            Student Management System | Faculty Dashboard
          </h1>
        )}
      </div>

      <h1 className="text-4xl font-bold underline text-gray-700 ml-2">
        Student
      </h1>
      {/* Courses Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 p-2 gap-5">
        {courseList?.map((course) => {
          return (
            <Card
              key={course._id}
              customClass="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              {/* Course Info */}
              <div className="mb-3 border-b pb-2">
                <h2 className="text-lg font-bold text-gray-800">
                  {course?.name}
                </h2>
                <p className="text-sm text-gray-500">Code: {course?.code}</p>
                <p className="text-sm text-gray-500">
                  Department: {course?.department || "N/A"}
                </p>
              </div>

              {/* Students */}
              {user.role !== "student" && <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">
                  Students:
                </h3>
                {course?.students?.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-600 max-h-24 overflow-y-auto">
                    {course.students.map((student) => (
                      <li key={student._id}>{student?.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">No students enrolled</p>
                )}
              </div>}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
