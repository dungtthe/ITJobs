import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/sonner";
export default function Index() {
  return (
    <>
      <div className="user-theme">
        <Header />
        <div className="container mx-auto px-15">
          <Outlet />
        </div>
        <Footer />
        <Toaster></Toaster>
      </div>
    </>
  );
}
