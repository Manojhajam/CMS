import React, { useState } from 'react'
import Modal from '../common/Modal';

const AddStaff = () => {
const {showModel, setShowModal} = useState()

  return (
    <div className="bg-emerald-100 h-screen">
      <div className="bg-white p-4 ">
        <h1 className="text-3xl text-gray-700">
          Student Management System | Admin Dashboard
        </h1>
      </div>
        <button className='bg-amber-300 p-2 rounded-lg mt-4' >Add Staff</button>
      {/* <Modal/> */}
    </div>
  );
}

export default AddStaff
