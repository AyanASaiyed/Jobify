"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { gapi } from "gapi-script";

interface UserInfo {
  image: string;
  name: string;
  email: string;
  token: string;
}

const ApplicationsPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [emails, setEmails] = useState<any[]>([]);
  const router = useRouter();

  // Load Google API
  useEffect(() => {
    const loadGapi = () => {
      gapi.load("client", () => {
        console.log("Google API loaded.");
      });
    };
    loadGapi();
  }, []);

  // Initialize Google API client
  const initClient = async (token: string) => {
    try {
      await gapi.client.init({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
        ],
        scope: "https://www.googleapis.com/auth/gmail.readonly",
      });

      // Set the access token
      gapi.client.setToken({ access_token: token });
      console.log("Google API initialized with token.");
    } catch (error) {
      console.error("Error initializing Google API client:", error);
    }
  };

  // Fetch Emails from Gmail API
  const fetchEmails = async (token: string) => {
    try {
      console.log("Fetching emails with token:", token);
      const response = await fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Gmail API Error:", errorResponse);
        throw new Error(errorResponse.error.message);
      }

      const data = await response.json();
      setEmails(data.messages || []);
    } catch (error) {
      console.error("Failed to fetch emails:", error);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    if (!data) {
      router.push("/");
      return;
    }

    const user = JSON.parse(data);
    setUserInfo(user);

    if (user?.token) {
      initClient(user.token).then(() => fetchEmails(user.token));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    router.push("/");
  };

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
        <div className="h-[80vh] w-[80vw] bg-zinc-900 rounded-xl shadow-2xl shadow-zinc-600 p-4 overflow-y-auto">
          {emails.length > 0 ? (
            <ul>
              {emails.map((email, index) => (
                <li key={index} className="text-white p-2 border-b border-zinc-700">
                  Email ID: {email.id}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white text-center">No emails found.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default ApplicationsPage;
