import React, { useContext, useEffect, useState } from "react";
import Modal from "../common/Modal";
import { makeApiRequest } from "../../lib/api";
import { AuthContext } from "../../context/AuthContext";
import {MemberContext} from "../../context/memberContext"

const AddStaff = () => {
  const { user, setuser } = useContext(AuthContext);
  const {members} =useContext(MemberContext)
  const [showModel, setShowModal] = useState(false);
  const [addFaculty, setAddFaculty] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  console.log(members)
  const AddFaculty = async () => {
    const { response, error } = await makeApiRequest({
      endpoint: "/admin/faculty",
      method: "POST",
    });

    console.log(response);

    if (error) {
      console.log(error);
      return;
    }
    if (response.success) {
      setAddFaculty(response.data);
    }
  };
  useEffect(() => {
    AddFaculty();
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
      {/* <div className="text-5xl text-pink-600 bg-red-800 p-5 w-fit rounded-lg mt-8 text-center ml-[50%] hover:bg-amber-100 hover:text-black">Priyanshi Singh</div> */}
      <Modal
        open={showModel}
        onClose={() => {
          setShowModal(false);
        }}
        title="Add Staff"
      >
        <form>
          <h5 className="font-semibold">Fill the issuance details</h5>
          <select name="" value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)
          }>
            <option value="">Select Member</option>
             {members?.faculty?.map((member) => { 
              return (
                <option key={member?._id} value={member?._id}>
                  {" "}
                  {member?.name}
                </option>
              );
              } 
             )} 
          </select>
          <div className="flex flex-col gap-2">
            <label htmlFor="employeeId">Employee Id</label>
            <input type="text"/>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddStaff;
