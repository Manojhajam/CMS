import React, { useEffect, useState } from 'react'
import Card from '../common/Card';
import { makeApiRequest } from '../../lib/api';

const ManageStudent = () => {
    const [addedStudentlist, setAddedStudentlist] = useState([]);
    const [loading, setLoading] = useState(true);

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
    
    useEffect(() => {
        getStudent();
    },[])
  return (
    <div>
      <div className="bg-white p-4 shadow-lg">
        <h1 className="text-3xl text-gray-700">
          Student Management System | Admin Dashboard
        </h1>
      </div>

      {/* Student Card */}
      <h1 className="text-4xl ml-2 font-bold underline text-gray-700">
        Student
      </h1>
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
    </div>
  );
}

export default ManageStudent
