import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../context/authContext";
import Modal2 from "../components/common/Modal2";
import { TiTick } from "react-icons/ti";
import { TbCancel } from "react-icons/tb";

const Notification = () => {
  const { user } = useContext(AuthContext);
  const [showmodel, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
  return (
    <>
      <div className="bg-white p-4 shadow-lg">
        {user?.role === "admin" ? (
          <h1 className="text-3xl text-gray-700">
            College Management System | Admin Dashboard
          </h1>
        ) : user?.role === "faculty" ? (
          <h1 className="text-3xl text-gray-700">
            College Management System | Faculty Dashboard
          </h1>
        ) : (
          <h1 className="text-3xl text-gray-700">
            College Management System | Faculty Dashboard
          </h1>
        )}
      </div>

      <div className="flex justify-between items-center m-2">
        <h1 className="text-4xl font-bold underline text-gray-700">
          Notification
        </h1>
        {user?.role === "admin" ? (
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-400 text-white cursor-pointer p-2 rounded-lg"
          >
            Add Notification
          </button>
        ) : (
          ""
        )}
      </div>

      <Modal2
        title="Create Notification"
        open={showmodel}
        onClose={() => setShowModal(false)}
      >
        <form>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              placeholder="Enter title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="bg-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Subject</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={subject}
              placeholder="Enter subject"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              className="bg-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Message</label>
            <textarea
              type="text"
              name="message"
              id="message"
              value={message}
              placeholder="Type your message..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              rows={4}
              className="bg-gray-300 w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mt-2 flex">
            <button className="flex gap-1 bg-blue-500 items-center px-5 py-2 rounded text-white">
              <TiTick />
              OK
            </button>
            <button className="flex gap-1 bg-pink-100 items-center px-5 py-2 rounded text-blue-700 font-semibold">
              <TbCancel />
              Cancel
            </button>
          </div>
        </form>
      </Modal2>
    </>
  );
};

export default Notification;
