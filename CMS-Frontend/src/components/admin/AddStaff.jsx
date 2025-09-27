import React, { useContext, useEffect, useState } from "react";
import Modal from "../common/Modal";
import { makeApiRequest } from "../../lib/api";
import { AuthContext } from "../../context/AuthContext";
import { MemberContext } from "../../context/memberContext";
import Card from "../common/Card";

const AddStaff = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { members } = useContext(MemberContext);
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedcourse, setselectedCourse] = useState([]);
  const [showModel, setShowModal] = useState(false);
  const [addFaculty, setAddFaculty] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [courselist, setCourseList] = useState([]);
  const [addedFacultylist, setAddedFacultylist] = useState([]);

  const getFaculty = async () => {
    setLoading(true);
    const { response, error } = await makeApiRequest({
      endpoint: "/admin/faculty",
    });
    console.log(response);
    setLoading(false);

    if (error) return;

    if (response.success) {
      setAddedFacultylist(response.data);
    }
  };

  const getCourse = async () => {
    try {
      const { response, error } = await makeApiRequest({
        endpoint: "/courses",
      });

      // console.log("courses", response);

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

  const handleAddStaff = async (event) => {
    event.preventDefault();

    try {
      const { response, error } = await makeApiRequest({
        endpoint: "/admin/faculty",
        method: "POST",
        body: {
          userId: selectedMember,
          employeeId,
          department,
          courses: selectedcourse,
        },
      });

      console.log(response);

      if (error) {
        console.log(error);
        return;
      }
      if (response.success) {
        
        setAddFaculty(response.data);
        setShowModal(false);
        setSelectedMember("");
        setEmployeeId("");
        setDepartment("");
        setselectedCourse("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourse();
    getFaculty();
  }, []);
  return (
    <div className="h-screen">
      <div className="bg-white p-4 shadow-lg">
        <h1 className="text-3xl text-gray-700">
          Student Management System | Admin Dashboard
        </h1>
      </div>

      {/* Showing Staff */}
      <div className="flex justify-between items-center m-2">
        <h1 className="text-4xl font-bold underline text-gray-700">
          Faculty Members
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-600 text-white cursor-pointer p-2 rounded-lg"
        >
          Add Staff
        </button>
      </div>

      {/* Faculty Card */}
      <div className="flex mt-4 p-2 gap-5 ">
        {addedFacultylist?.map((faculty) => {
          return (
            <Card key={faculty._id} customClass={"w-full bg-white"}>
              <h1 className="text-2xl font-bold">{faculty.userId.name}</h1>
              <div>
                Courses teaches:{" "}
                {faculty?.courses?.length > 0
                  ? faculty.courses.map((course) => course.name).join(", ")
                  : "No courses assigned"}
              </div>
              <h3>Department: {faculty.department}</h3>
            </Card>
          );
        })}
      </div>

      {/* Modal for adding Staff */}
      <Modal
        open={showModel}
        onClose={() => {
          setShowModal(false);
        }}
        title="Add Staff"
      >
        <form>
          <h5 className="font-semibold">Fill the issuance details</h5>
          <select
            name="userId"
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="w-1/2 p-2 rounded-lg border"
          >
            <option value="">Select Member</option>
            {members?.faculty?.map((member) => {
              return (
                <option key={member?._id} value={member?._id}>
                  {" "}
                  {member?.name}
                </option>
              );
            })}
          </select>
          <div className="flex flex-col gap-2">
            <label htmlFor="employeeId">Employee Id</label>
            <input
              name="employeeId"
              type="text"
              id="employeeId"
              value={employeeId}
              placeholder="Input employee id"
              className="border w-full p-2 rounded-lg"
              onChange={(e) => {
                setEmployeeId(e.target.value);
              }}
            />
          </div>

          {/* Department */}
          <div className="flex flex-col gap-2">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              value={department}
              className="border w-full p-2 rounded-lg"
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Please enter department"
            />
          </div>

          {/* courses */}

          <select
            name="courses"
            value={selectedcourse}
            onChange={(e) => setselectedCourse([e.target.value])}
            className="w-1/2 p-2 rounded-lg border mt-2"
          >
            <option value="">Select Course</option>
            {courselist?.map((course) => {
              return (
                <option key={course?._id} value={course?._id}>
                  {" "}
                  {course?.name}
                </option>
              );
            })}
          </select>
          <br />
          <div className="flex flex-col">
            <button
              type="button"
              className="bg-black text-white font-semibold hover:bg-gray-800 rounded-lg mt-2 flex self-end p-2"
              onClick={handleAddStaff}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddStaff;
