import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser, getMyProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    // ✅ Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    // Validate before API call
    if (!validateInputs()) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (responseData?.success) {
        localStorage.setItem("token", responseData.data.token);
        setUser(responseData.data.user);
        await getMyProfile();

        alert("Login Successful!!");
        navigate("/dashboard", { replace: true });
      } else {
        alert(responseData.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-tl bg-cyan-500 to-red-500 flex justify-center p-4 items-center">
      <div>
        <div className="mb-8">
          <h3 className="text-4xl font-bold text-center mb-2">
            Join Our College
          </h3>
          <p className="text-center font-light">
            Create your academic account instantly
          </p>
        </div>

        <form
          className="bg-white p-3 rounded-lg w-[400px] max-[400px]:w-fit"
          onSubmit={handleLogin}
        >
          <div>
            {" "}
            <h3 className="text-4xl font-bold text-center mb-2">
              Sign In
            </h3>{" "}
            <p className="text-center font-light">
              {" "}
              Login to to get started{" "}
            </p>{" "}
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
              className={`border w-full p-2 rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
              className={`border w-full p-2 rounded-lg ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold hover:bg-gray-800 rounded-lg mt-4 p-2"
          >
            Login
          </button>

          <p className="text-center mt-2">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="underline text-blue-900 font-bold"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
