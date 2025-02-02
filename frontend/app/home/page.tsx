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
    <main className="flex flex-col justify-center items-center h-screen">
      <img src={userInfo?.image} className="rounded-xl mb-10" />
      <h1 className="font-mono text-5xl text-white">
        {userInfo?.name}'s Dashboard
      </h1>
      <Button className="text-white bg-red-600" onClick={handleLogout}>
        Logout
      </Button>
    </main>
  );
};

export default DashboardPage;
