import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//admin
import LayoutAdmin from "../layouts/Admin";
import Admin_Home from "@/pages/Admin/Dashboard";
//user
import LayoutUser from "../layouts/User";
import User_Home from "@/pages/User/Home";
export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ADMIN */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Admin_Home />} />
        </Route>
        {/* USER*/}
        <Route path="/" element={<LayoutUser />}>
          <Route index element={<User_Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
