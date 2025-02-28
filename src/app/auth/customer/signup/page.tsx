"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/auth/customer/login");
        } catch (error:any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password && user.username));
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
            {/* Logo */}
            <img src="/logo.png" alt="Logo" className="w-24 mb-4" />

            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-semibold text-center mb-4">{loading ? "Processing..." : "Sign Up"}</h1>
                <hr className="mb-4" />
                
                <label className="block text-gray-700">Username</label>
                <input 
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 text-black"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="Enter your username"
                />
                
                <label className="block text-gray-700">Email</label>
                <input 
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 text-black"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="Enter your email"
                />
                
                <label className="block text-gray-700">Password</label>
                <input 
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 text-black"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="Enter your password"
                />
                
                <button
                    onClick={onSignup}
                    className={`w-full p-2 rounded-lg text-white ${buttonDisabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                    disabled={buttonDisabled}
                >
                    {buttonDisabled ? "Fill all fields" : "Sign Up"}
                </button>
                
                <p className="text-center mt-4 text-gray-600">
                    Already have an account? <Link href="/auth/customer/login" className="text-blue-500 hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}