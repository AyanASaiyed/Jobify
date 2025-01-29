import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1 className="text-blue-500 font-extrabold text-5xl">Jobify</h1>
      <h2 className="mt-5 text-2xl text-white">
        A personal Job Application Tracking System using Gmail and Cohere AI
        API.
      </h2>
      <Button className="text-white mt-5">
        <Mail/> Login with Gmail
      </Button>
    </div>
  );
}
