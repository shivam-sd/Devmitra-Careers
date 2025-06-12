import React from 'react'
import {useState} from "react";
import axios from "axios";
import DevmitraLogo from "../assets/DevmitraLogo.png";
import { useNavigate } from "react-router-dom";

export default function LoginPage (){
    const [showPassword, setShowPassword] = useState(false);
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/private/admin/login`,
        { email, password }
      );
      // Handle successful login (e.g., save token, redirect)
      localStorage.setItem("token", response.data.token);
      console.log("Login successful:", response.data);
      setError(""); // Clear error on success
      navigate("/DashboardAdmin");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (

    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side (Logo Section) */}
      <div className="md:w-1/2 w-full bg-gradient-to-b md:bg-gradient-to-r from-gray-900 to-black flex flex-col justify-center items-center text-white p-10">
        <img
          src={DevmitraLogo} 
          alt="Devmitra Logo"
          className="w-32 md:w-72 mb-4 rounded-2xl"
        />
        <h1 className="text-3xl font-bold tracking-wide">DEVMITRA</h1>
        <p className="text-sm tracking-widest mt-1">SOLUTIONS</p>
      </div>

      {/* Right Side (Form Section) */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Login</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                placeholder="alexcopper@gmail.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                   value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                  placeholder="Enter Password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-500 hover:text-gray-700 "
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 rounded-md shadow-lg transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};
