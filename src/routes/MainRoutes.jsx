import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//admin
import Admin_Layout from "@/layouts/admin/Index.jsx";
import Admin_Home from "@/features/admin/dashboard/views/Index.jsx";
import Admin_EmployerManagements from "@/features/admin/users/employer-managements/views/Index.jsx";
import Admin_CandidateManagements from "@/features/admin/users/candidate-managements/views/Index.jsx";

//employer
import Employer_Layout from "@/layouts/employer/Index.jsx";
import Employer_Home from "@/features/employer/dashboard/views/Index.jsx";
import Employer_CompanyProfile from "@/features/employer/company-profile/views/Index.jsx";

//user
import User_Layout from "@/layouts/user/Index.jsx";
import User_Home from "@/features/user/views/Index.jsx";
import Login from "@/features/auth/views/Login.jsx";
import Test from "@/features/test.jsx";
export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ADMIN */}
        <Route path="/admin" element={<Admin_Layout />}>
          <Route index element={<Admin_Home />} />
          <Route path="employer" element={<Admin_EmployerManagements />} />
          <Route path="candidate" element={<Admin_CandidateManagements />} />
        </Route>
        {/* EMPLOYER */}
        <Route path="/employer" element={<Employer_Layout />}>
          <Route index element={<Employer_Home />} />
          <Route path="profile" element={<Employer_CompanyProfile />} />
        </Route>
        {/* USER*/}
        <Route path="/" element={<User_Layout />}>
          <Route index element={<User_Home />} />
          <Route path="login" element={<Login />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
