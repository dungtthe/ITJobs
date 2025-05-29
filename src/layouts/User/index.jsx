import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
export default function Index() {
  return (
    <>
      <div className="user-theme">
        <Header />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
