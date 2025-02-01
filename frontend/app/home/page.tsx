import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import dotenv from "dotenv";

dotenv.config();

const DashboardPage = () => {
  return <main> Home </main>;
};

export default function Dashboard() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <DashboardPage />
    </GoogleOAuthProvider>
  );
}
