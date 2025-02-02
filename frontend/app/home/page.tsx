"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("user-info");
    router.push("/");
  };

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const userData = data ? JSON.parse(data) : {};
    setUserInfo(userData);
  }, []);

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="h-[8vh] bg-zinc-900 w-screen top-0 -z-10 flex items-center">
        <img
          src={userInfo?.image}
          className="rounded-xl mr-10 ml-10 h-[6vh] shadow-lg shadow-black"
        />
        <h1 className="text-xl text-white font-mono">
          {userInfo?.name}'s Dashboard
        </h1>
        <Button
          className="text-white bg-red-600 ml-auto mr-5"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-40 w-full max-w-5xl">
        <div className="bg-gray-800 rounded-xl shadow-lg text-white font-mono text-2xl text-center h-[30vh] flex items-center justify-center hover:bg-zinc-900 hover:text-blue-400 hover:shadow-blue-400 hover:text-3xl">
          Applications📰
        </div>
        <div className="bg-gray-800 rounded-xl shadow-md text-white font-mono text-2xl text-center h-[30vh] flex items-center justify-center hover:bg-zinc-900 hover:text-blue-400 hover:shadow-blue-400 hover:text-3xl">
          Interviews🗣️
        </div>
        <div className="bg-gray-800 rounded-xl shadow-md text-white font-mono text-2xl text-center h-[30vh] flex items-center justify-center hover:bg-zinc-900 hover:text-blue-400 hover:shadow-blue-400 hover:text-3xl">
          Offers✅
        </div>
        <div className="bg-gray-800 rounded-xl shadow-md text-white font-mono text-2xl text-center h-[30vh] flex items-center justify-center hover:bg-zinc-900 hover:text-blue-400 hover:shadow-blue-400 hover:text-3xl">
          Rejections❌
        </div>
        <div className="bg-gray-800 rounded-xl shadow-md text-white font-mono text-2xl text-center h-[30vh] flex items-center justify-center hover:bg-zinc-900 hover:text-blue-400 hover:shadow-blue-400 hover:text-3xl">
          Online Assessments🧠
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
