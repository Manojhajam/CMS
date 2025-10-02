import React, { useContext, useEffect, useState } from 'react'
import Card from '../common/Card';
import { makeApiRequest } from '../../lib/api';
import Modal from '../common/Modal';
import { MemberContext } from '../../context/memberContext';

const ManageStudent = () => {
    const [addedStudentlist, setAddedStudentlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModel, setShowModal] = useState(false)
    const { members } = useContext(MemberContext)
    const [selectedStudent, setSelectedStudent] = useState([])
    const [rollNumber, setRollNumber] = useState("")
    const [department, setDepartment] = useState("");
    const [selectedcourse, setselectedCourse] = useState([]);
    const [courselist, setCourseList] = useState([]);
    const [addStudent, setAddStudent] = useState([])
    
// console.log(members)
      const getStudent = async () => {
        setLoading(true);
        const { response, error } = await makeApiRequest({
          endpoint: "/admin/faculty",
        });
        console.log(response);
        setLoading(false);
    
        if (error) return;
    
        if (response.success) {
          setAddedStudentlist(response.student)
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
    
    const handleAddStudent = async (event) => {
        event.preventDefault();
        try {
            const { response, error } = await makeApiRequest({
                endpoint: "/admin/students",
                method: "POST",
                body: {
                    userId: selectedStudent,
                    rollNumber,
                    department,
                    courses: selectedcourse
                }
            });
            console.log(response)

            if (error) {
                console.log(error);
                return;
            }

            if (response.success) {
                setAddStudent(response.data);
                setShowModal(false)
                setSelectedStudent("");
                setRollNumber("");
                setDepartment("");
                selectedcourse("")
            }
        }
        catch (error) {
    console.log(error)
        }
    }
    useEffect(() => {
        getCourse();
        getStudent();
    },[])
  return (
    <div>
      <div className="bg-white p-4 shadow-lg">
        <h1 className="text-3xl text-gray-700">
          Student Management System | Admin Dashboard
        </h1>
      </div>

      <div className="flex justify-between items-center m-2">
        <h1 className="text-4xl font-bold underline text-gray-700">Student</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-400 text-white cursor-pointer p-2 rounded-lg"
        >
          Add Student
        </button>
      </div>

      {/* Student Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 p-2 gap-5">
        {addedStudentlist?.map((student) => {
          return (
            <Card key={student._id} customClass={"bg-white"}>
              <h1 className="text-2xl font-bold">
                {student?.userId?.name || "Student"}
              </h1>

              <h3>Department: {student.department}</h3>
              <h2>Roll No: {student.rollNumber}</h2>
            </Card>
          );
        })}
      </div>

      {/* Modal for a Student */}
      <Modal
        open={showModel}
        onClose={() => {
          setShowModal(false);
        }}
        title="Add Student"
      >
        <form>

          {/* select Studenty*/}
          <select
            name="userId"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="p-2 rounded-lg border w-full"
          >
            <option value="">Select Student</option>
            {members?.student?.map((student) => {
              return (
                <option key={student?._id} value={student._id}>
                  {student?.name}
                </option>
              );
            })}
          </select>

          {/* Roll Number */}
          <div className="flex flex-col gap-2">
            <label htmlFor="rollNo">Roll Number</label>
            <input
              name="rollNumber"
              type="number"
              id="rollNo"
              value={rollNumber}
              placeholder="Input Roll Number"
              className="border w-full p-2 rounded-lg"
              onChange={(e) => {
                setRollNumber(e.target.value);
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
            className="p-2 rounded-lg border mt-2 w-full"
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
              className="bg-gray-500 text-white font-semibold hover:bg-green-500 rounded-lg mt-2 flex self-end p-2"
              onClick={handleAddStudent}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ManageStudent
