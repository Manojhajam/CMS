import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../context/authContext";
import Modal2 from "../components/common/Modal2";
import { TiTick } from "react-icons/ti";
import { TbCancel } from "react-icons/tb";
import { makeApiRequest } from "../lib/api";
import { useEffect } from "react";
import NepaliDate from "nepali-date-converter"

const Notification = () => {
  const { user } = useContext(AuthContext);
  const [showmodel, setShowModal] = useState(false);
  // const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [notification, setNotification] = useState([]);

  console.log(notification);

  const handleNotification = async (e) => {
    e.preventDefault();

    if (!subject || !message) {
      alert("All fields are required!");
      return;
    }

    const { response, error } = await makeApiRequest({
      endpoint: "/notification/notifications",
      method: "POST",
      body: {
        // title,
        message,
        subject: subject,
        createdBy: user?._id,
      },
    });

    if (error) {
      console.log(error);
      return;
    }
    if (response?.success) {
      setShowModal(false);
      await getNotification();
      setTitle("");
      setSubject("");
      setMessage("");
    }
  };

  const getNotification = async () => {
    const { response, error } = await makeApiRequest({
      endpoint: "/notification/notifications",
    });

    if (error) {
      console.log(error);
      return;
    }

    if (response.success) {
      setNotification(response.data);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);
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
      <div className="p-2 flex flex-col gap-4">
        {notification?.map((notice) => {
          // Convert to AD readable format
          const adDate = new Date(notice?.createdAt);
          const formattedAD = adDate.toLocaleString("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
          });

          // Convert to BS format
          const bsDate = new NepaliDate(adDate);
          const formattedBS = bsDate.format("YYYY-MM-DD"); // or "DD MMMM, YYYY"
          return (
            <div
              key={notice?._id}
              className="p-2 rounded-lg shadow-sm border border-gray-300 flex gap-4"
            >
              <div>
                <img
                  src="/hdc.jpg"
                  alt="logo"
                  className="w-20 h-22 rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {notice?.subject}
                </h3>
                <h3 className="text font-semibold text-gray-600 ">
                  {notice?.message}
                </h3>
                <h1 className="text-sm text-gray-500 mt-2">
                  {notice?.createdBy?.name}
                </h1>
                <p className="text-[12px] text-gray-500">
                  {formattedBS} BS ({formattedAD})
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Modal2
        title="Create Notification"
        open={showmodel}
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleNotification}>

          <div className="flex flex-col gap-2">
            <label htmlFor="subject">Subject</label>
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
            <button
              type="submit"
              className="flex gap-1 bg-blue-500 items-center px-5 py-2 rounded text-white"
            >
              <TiTick />
              OK
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex gap-1 bg-pink-100 items-center px-5 py-2 rounded text-blue-700 font-semibold"
            >
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
