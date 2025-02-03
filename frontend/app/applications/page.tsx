"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { gapi } from "gapi-script";

interface UserInfo {
  image: string;
  name: string;
  email: string;
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const ApplicationsPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    router.push("/");
  };

  const fetchMessages = async (token: string) => {
    gapi.load("client", async () => {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
        ],
      });

      const res = await gapi.client.gmail.users.messages.list({
        userId: "me",
        access_token: token,
      });

      console.log("GMAIL api res: ", res);
    });
  };

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const user = data ? JSON.parse(data) : {};
    setUserInfo(user);
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center bg-zinc-900 h-[8vh] w-screen text-center">
        <Button
          className="text-white mr-auto ml-5"
          onClick={() => router.push("/home")}
        >
          Dashboard
        </Button>
        <h1 className="text-white font-mono text-2xl mr-5">My Applications</h1>
        <Button
          className="text-white bg-red-600 ml-auto mr-5"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      <section className="flex items-center justify-center flex-grow">
        <div className="h-[80vh] w-[80vw] bg-zinc-900 rounded-xl shadow-2xl shadow-zinc-600"></div>
      </section>
    </main>
  );
};

export default ApplicationsPage;
