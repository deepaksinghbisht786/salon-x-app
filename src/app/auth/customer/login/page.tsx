"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error); // Log the full error
  
      if (error.response) {
       
        console.log("Server responded with status:", error.response.status);
        console.log("Server response data:", error.response.data);
  
        if (error.response.status === 500) {
          toast.error("Server error. Please try again later.");
        } else if (error.response.data && error.response.data.error) {
          // Server provided a specific error message
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received from server:", error.request);
        toast.error("Network error. Please check your connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error setting up the request:", error.message);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          {loading ? "Processing..." : "Login"}
        </h2>
        <p className="text-gray-500 text-sm text-center mt-1">
          Enter your details to continue
        </p>

        <div className="mt-6">
          <label className="block text-gray-600 text-sm font-medium">Email Address</label>
          <input
            type="email"
            className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-800 border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-800 border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <button
          onClick={onLogin}
          disabled={buttonDisabled}
          className={`w-full mt-6 py-2 rounded-lg text-white font-medium transition ${
            buttonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {loading ? "Logging in..." : "Continue"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link href="/auth/customer/signup" className="text-orange-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
