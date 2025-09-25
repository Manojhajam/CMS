import React, { useContext, useEffect, useState } from "react";
import Modal from "../common/Modal";
import { makeApiRequest } from "../../lib/api";
import { AuthContext } from "../../context/authContext";

const AddStaff = () => {
  const { user, setuser } = useContext(AuthContext);
  const [showModel, setShowModal] = useState(false);
  const [addFaculty, setAddFaculty] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  // console.log(user)
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
      <Modal
        open={showModel}
        onClose={() => {
          setShowModal(false);
        }}
        title="Add Staff"
      >
        <div>
          <h5 className="font-semibold">Fill the issuance details</h5>
          <select name="" value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)
          }>
            <option value="">Select Member</option>
            {/* {user?.map((users) => { */}
              return (
                <option key={user?._id} value={user?._id}>
                  {" "}
                  {user?.name}
                </option>
              );
             {/* } */}
            {/* )} */}
          </select>
        </div>
      </Modal>
    </div>
  );
};

export default AddStaff;
