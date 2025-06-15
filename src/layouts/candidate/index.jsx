import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/sonner";
import { ChatWidget } from "@/components/my-components/ChatWidget";

export default function Index() {
  return (
    <>
      <div className="user-theme">
        <Header />
        {/* <div className="container mx-auto px-15"> */}
        <div>
          <Outlet />
        </div>
        <Footer />
        <Toaster></Toaster>
        <ChatWidget />
      </div>
    </>
  );
}
