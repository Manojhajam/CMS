import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/common/Card";
import { FiCheck, FiEdit, FiX } from "react-icons/fi";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <div className="p-4 px-8  mb-8 shadow">
        <h4 className="text-3xl font-semibold">Profile</h4>
      </div>

      <div className="px-4 grid grid-cols-2 gap-8">
        <Card customClass="space-y-4 bg-white shadow">
          <div className="flex justify-between items-center border-b pb-1">
            <h6 className="text-lg font-semibold">User Details</h6>
            <button
              onClick={() => {
                setEditMode(!editMode);
                setEditedUserInfo(user);
              }}
              className="hover:bg-green-100 rounded-lg p-2 text-green-600 cursor-pointer"
            >
              <FiEdit size={20} />
            </button>
          </div>

          <div className="space-y-1">
            <p className="font-bold">Name</p>
            <p>{user?.name || "-"}</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Phone Number</p>
            <p>{user?.phoneNumber || "-"}</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Email</p>
            <p>{user?.email || "-"}</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Role</p>
            <p>{user?.role || "-"}</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setChangePasswordMode(true);
              }}
              className="p-2 bg-red-400 hover:bg-red-400/90 rounded-lg text-white cursor-pointer"
            >
              Change Password
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
