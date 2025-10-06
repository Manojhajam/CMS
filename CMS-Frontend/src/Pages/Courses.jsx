import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { makeApiRequest } from "../lib/api";
import Card from "../components/common/Card";
import Modal from "../components/common/Modal";
import { FiEdit, FiEdit2 } from "react-icons/fi";
import EditBookModel from "../components/common/EditBookModel";

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [courseList, setCourseList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [addedStudentlist, setAddedStudentlist] = useState([]);
  const [showModel, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [department, setDepartment] = useState("");

  const [tobeEditedcourse, settobeeditedcourse] = useState(null)
  const [showeditCourseModel, setShoweditCourseModel] = useState(false)
  // console.log(courseList)
  

  const isFormValid = name && code && department && selectedStudent.length > 0;

  const getCourse = async () => {
    try {
      const { response, error } = await makeApiRequest({
        endpoint: "/courses",
      });

      // console.log("courses", response.data);

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

  const getStudent = async () => {
    setLoading(true);
    const { response, error } = await makeApiRequest({
      endpoint: "/admin/faculty",
    });
    // console.log("student", response);
    setLoading(false);

    if (error) return;

    if (response.success) {
      setAddedStudentlist(response.student);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();

    const { response, error } = await makeApiRequest({
      endpoint: "/courses",
      method: "POST",
      body: {
        name,
        code,
        department,
        students: selectedStudent, // 👈 array of ObjectIds
      },
    });

    if (response?.success) {
      setShowModal(false);
      getCourse(); // refresh list
    }
  };


  const handleEditBook = (course) => {
    settobeeditedcourse(course)
    setShoweditCourseModel(true)
  }
  
  
  useEffect(() => {
    getCourse();
    if (user?.role !== "student") getStudent();
  }, [user]);

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

      <div className="flex justify-between items-center m-2">
        <h1 className="text-4xl font-bold underline text-gray-700">Courses</h1>
        {user?.role === "admin" ? (
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-400 text-white cursor-pointer p-2 rounded-lg"
          >
            Add Course
          </button>
        ) : (
          ""
        )}
      </div>
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
                <div className="flex justify-between"> 
                  <h2 className="text-lg font-bold text-gray-800">
                    {course?.name}
                  </h2>
                  {user?.role === "admin" && <div onClick={()=>handleEditBook(course)}
                    className="hover:bg-green-100 p-1 rounded-lg text-green-500">
                    <FiEdit2 size={14} />
                  </div>}
                </div>
                <p className="text-sm text-gray-500">Code: {course?.code}</p>
                <p className="text-sm text-gray-500">
                  Department: {course?.department || "N/A"}
                </p>
              </div>

              {/* Students */}
              {user.role !== "student" && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    Students:
                  </h3>
                  {course?.students?.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-600 max-h-24 overflow-y-auto">
                      {course.students.map((student) => (
                        <li key={student._id}>{student?.userId?.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400">
                      No students enrolled
                    </p>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Modal for create Courses */}
      <Modal
        open={showModel}
        onClose={() => {
          setShowModal(false);
        }}
        title="Add Course"
      >
        <form onSubmit={handleAddCourse}>
          {/* name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              id="name"
              value={name}
              placeholder="Input name of Course"
              className="border w-full p-2 rounded-lg"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          {/* Code */}
          <div className="flex flex-col gap-2">
            <label htmlFor="code">Code</label>
            <input
              name="code"
              type="text"
              id="code"
              value={code}
              placeholder="Enter course code"
              className="border w-full p-2 rounded-lg"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          </div>

          {/* Department */}
          <div className="flex flex-col gap-2">
            <label htmlFor="department">Department</label>
            <input
              name="department"
              type="text"
              id="department"
              value={department}
              placeholder="Enter department"
              className="border w-full p-2 rounded-lg"
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            />
          </div>

          {/* Select Student */}
          <div className="flex flex-col gap-2 mt-4">
            <label className="font-semibold">Select Students</label>
            <div className="max-h-40 overflow-y-auto border rounded-lg p-2">
              {addedStudentlist?.map((student) => (
                <label
                  key={student._id}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    value={student._id}
                    checked={selectedStudent.includes(student._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStudent([...selectedStudent, student._id]);
                      } else {
                        setSelectedStudent(
                          selectedStudent.filter((id) => id !== student._id)
                        );
                      }
                    }}
                  />
                  {student?.userId?.name}
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-4 py-2 rounded-lg mt-4 text-white self-end
    ${
      isFormValid
        ? "bg-green-500 hover:bg-green-600 cursor-pointer"
        : "bg-gray-400 cursor-not-allowed"
    }`}
            >
              Save Course
            </button>
          </div>
        </form>
      </Modal>

      <EditBookModel tobeEditedcourse={tobeEditedcourse} open={showeditCourseModel} onClose={() => {
        setShoweditCourseModel(false);
        settobeeditedcourse("")
      }} addedStudentlist={addedStudentlist}
        onCourseUpdated={getCourse}
    />
    </div>
  );
};

export default Courses;
