"use client";
import { useRouter } from "next/navigation";
export default function Home() {
    const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Salon X</h1>
      <p className="text-lg">Welcome to Salon X!</p>
      <button onClick={() => router.push('/auth/customer/login')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</button>
    </div>
  );
}