"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link"; 
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setloading] = useState(false);
  const router = useRouter()

  const LoginAdmin = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, {
        email,
        pass,
      }, { withCredentials: true });
      Cookies.set("token", response.data.accessToken, {
        expires: 7, 
        secure: false, // true for https
        sameSite: "Strict",
      });
      setMessage("Login successful!");
      router.push("/Admin")
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
    setloading(false)
    }
  };

  return (
    <div className="flex items-center justify-center  mt-10">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {message && <div className="text-sky-500 font-bold mb-4 text-center">{message}</div>}
        <form onSubmit={LoginAdmin}>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
            />
          </label>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Password:
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-gray-950 text-white py-2 mt-4 rounded-md transition duration-300"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link href="/Register">
            <span className="text-blue-500 hover:underline cursor-pointer">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
