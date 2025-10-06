
import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { makeApiRequest } from '../../lib/api';

const EditBookModel = ({ tobeEditedcourse, open, onClose,addedStudentlist,getCourse }) => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [department, setDepartment] = useState("");
    const [selectedStudent, setSelectedStudent] = useState([]);
  //  const [showModal, setShowModal] = useState(open)
  console.log(tobeEditedcourse)
  
    useEffect(() => {
      if (tobeEditedcourse) {
        setName(tobeEditedcourse.name || "");
        setCode(tobeEditedcourse.code || "");
        setDepartment(tobeEditedcourse.department || "");
        setSelectedStudent(tobeEditedcourse.students?.map((s) => s._id) || []);
      }
    }, [tobeEditedcourse]);
    
    const handleEditCourse = async () => {
        const { response, error } = await makeApiRequest({
            endpoint: `/courses/${tobeEditedcourse._id}`,
          method: "PUT",
          body: {
            name,
            code,
            department,
            students: selectedStudent
            }
        })
        if (error) {
            console.log(error)
        }
      if (response.success) {
        getCourse();
           onClose();
        }
     }
    
    const isFormValid = name && code && department && selectedStudent.length > 0;
  return (
    <div>
      <Modal open={open} onClose={onClose} title='Edit Course'>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleEditCourse();
        }}>
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
              // disabled={!isFormValid}
              className={`px-4 py-2 rounded-lg mt-4 text-white self-end
    ${
      isFormValid
        ? "bg-green-500 hover:bg-green-600 cursor-pointer"
        : "bg-gray-400 cursor-not-allowed"
                }
    `}
            >
              Save Course
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EditBookModel
