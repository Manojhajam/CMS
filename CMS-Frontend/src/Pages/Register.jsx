import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

   const [name, setName] = useState("");
   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");


  const handleRegister = async (event) => {
     event.preventDefault();
     console.log("name", name, email, password);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password,
        }),
      });

      const responseData = await response.json();
      console.log("API", responseData)

      if (responseData.success) {
        alert("user id created!!");
        setName(""); // ✅ clear name input
        setEmail(""); // ✅ clear email input
        setPassword(""); // ✅ clear password input
        // navigate("/login");
      }
       else {
      alert(responseData.message || "Registration failed");
    }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="h-screen bg-gradient-to-tl bg-cyan-500 to-red-500 flex justify-center p-4 ">
      <div>
        <div className="mb-8">
          <div className="w-15 h-15 p-3 mx-auto mb-5" />
          <h3 className="text-4xl font-bold text-center mb-2">
            Join Our College
          </h3>
          <p className="text-center font-light">
            Create your academic account instantly
          </p>
        </div>
        <form className="bg-white p-3 rounded-lg w-[400px]">
          <div>
            <h3 className="text-4xl font-bold text-center mb-2">Sign Up</h3>
            <p className="text-center font-light">
              Create a new account to get started
            </p>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="name" className="mb-2">
              Name
            </label>
            <input
              id="name"
              value={name}
              type="text"
              placeholder="Enter Your name"
              className="border w-full p-2 rounded-lg"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              id="email"
              value={email}
              type="email"
              placeholder="Enter Your email"
              className="border w-full p-2 rounded-lg"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input
              id="password"
              value={password}
              type="password"
              placeholder="Enter Your Password"
              className="border w-full p-2 rounded-lg"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button className="w-full bg-black text-white font-semibold hover:bg-gray-800 rounded-lg mt-4 p-2" onClick={handleRegister}>
              Sign Up
            </button>

            <p className="text-center mt-2">
              Already Have an Account{" "}
              <Link
                to={"/login"}
                className="underline text-blue-900 font-bold  "
              >
                Log in
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
