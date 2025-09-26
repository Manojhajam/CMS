import React, { useContext, useEffect, useState } from "react";
import Modal from "../common/Modal";
import { makeApiRequest } from "../../lib/api";
import { AuthContext } from "../../context/AuthContext";
import { MemberContext } from "../../context/memberContext";

const AddStaff = () => {
  const { user } = useContext(AuthContext);
  const { members } = useContext(MemberContext);
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedcourse, setselectedCourse] = useState([]);
  const [showModel, setShowModal] = useState(false);
  const [addFaculty, setAddFaculty] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [courselist, setCourseList] = useState([])

  const getCourse = async () => {
    try {
      const { response, error } = await makeApiRequest({
        endpoint: "/courses"
      });

       console.log("courses",response);

       if (error) {
         console.log(error);
         return;
       }
       if (response.success) {
         setCourseList(response.data);
       }

    } catch (error) {
      console.log(error)
    }
  }

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
        setShowModal(false)
        setSelectedMember("");
        setEmployeeId("")
        setDepartment("")
        setselectedCourse("")
      }
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    getCourse();
  }, []);
  return (
    <div className="bg-emerald-100 h-screen">
      <div className="bg-white p-4 ">
        <h1 className="text-3xl text-gray-700">
          Student Management System | Admin Dashboard
        </h1>
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-amber-300 p-2 rounded-lg mt-4"
      >
        Add Staff
      </button>

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

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold hover:bg-gray-800 rounded-lg mt-4 p-2"
            onClick={handleAddStaff}
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddStaff;
