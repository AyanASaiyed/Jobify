"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "@/hooks/useOAuth";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();

  const responseGoogle = async (authResult: any) => {
    try {
      if (authResult["code"]) {
        console.log("Authorization code:", authResult.code);
        const res = await googleAuth(authResult.code);
        const { email, name, image } = res.data.user;
        const token = res.data.token;
        const obj = { email, name, image, token };
        localStorage.setItem("user-info", JSON.stringify(obj));
        router.push("/home");
      }
    } catch (error) {
      console.log("Error in responseGoogle: ", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    scope: "https://www.googleapis.com/auth/gmail.readonly",
    flow: "auth-code",
  });

  return (
    <main className="flex justify-center items-center flex-col h-screen">
      <h1 className="text-blue-500 font-extrabold text-5xl">Jobify</h1>
      <h2 className="mt-5 text-2xl text-white">
        A personal Job Application Tracking System using Gmail and Cohere AI
        API.
      </h2>
      <Button className="text-white mt-5" onClick={() => googleLogin()}>
        <Mail /> Login with Gmail
      </Button>
    </main>
  );
}

export default function Home() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <HomePage />
    </GoogleOAuthProvider>
  );
}
