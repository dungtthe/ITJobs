import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//admin
import Admin_Layout from "@/layouts/admin/index.jsx";
import Admin_Home from "@/pages/admin/dashboard/views/Index.jsx";
import Admin_EmployerManagements from "@/pages/admin/users/employer-managements/views/Index.jsx";
import Admin_CandidateManagements from "@/pages/admin/users/candidate-managements/views/Index.jsx";
import Admin_BlogPost from "@/pages/admin/posts/blog-post/views/Index.jsx";
import Admin_BlogPost_Add from "@/components/my-components/posts/AddBlogPost.jsx";
import Admin_JobPost from "@/pages/admin/posts/job-post/views/Index.jsx";

//employer
import Employer_Layout from "@/layouts/employer/Index.jsx";
import Employer_Home from "@/pages/employer/dashboard/views/Index.jsx";
import Employer_CompanyProfile from "@/pages/employer/company-profile/views/Index.jsx";
import Employer_BlogPost from "@/pages/employer/posts/blog-post/views/Index.jsx";
import Employer_BlogPost_Add from "@/components/my-components/posts/AddBlogPost.jsx";
import Employer_JobPost from "@/pages/employer/posts/job-post/views/Index.jsx";
import Employer_JobPost_Add from "@/pages/employer/posts/job-post/views/AddJobPost.jsx";
import Employer_DetailJobPost from "@/pages/employer/posts/job-post/views/DetailJobPost.jsx";

//user
import User_Layout from "@/layouts/candidate/Index.jsx";
import User_Home from "@/pages/candidate/home/views/Index.jsx";
import Login from "@/pages/auth/views/Login.jsx";
import Test from "@/pages/test.jsx";
import Blog from "@/pages/candidate/posts/blog/views/Index.jsx";
import DetailBlog from "@/pages/candidate/posts/blog/views/Detail.jsx";
import Infomation from "@/pages/candidate/profile/views/Index.jsx";
import CompanyDetail from "@/pages/candidate/employer/views/Index.jsx";
import CompanyProfiles from "@/pages/candidate/employer/views/CompanyProfiles/Index.jsx";
import CompanyReviews from "@/pages/candidate/employer/views/CompanyReviews/Index.jsx";
export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ADMIN */}
        <Route path="/admin" element={<Admin_Layout />}>
          <Route index element={<Admin_Home />} />
          <Route path="employer" element={<Admin_EmployerManagements />} />
          <Route path="candidate" element={<Admin_CandidateManagements />} />
          <Route path="blog-post" element={<Admin_BlogPost />} />
          <Route path="blog-post/add" element={<Admin_BlogPost_Add />} />
          <Route path="job-post" element={<Admin_JobPost />} />
        </Route>
        {/* EMPLOYER */}
        <Route path="/employer" element={<Employer_Layout />}>
          <Route index element={<Employer_Home />} />
          <Route path="profile" element={<Employer_CompanyProfile />} />
          <Route path="blog-post" element={<Employer_BlogPost />} />
          <Route path="blog-post/add" element={<Employer_BlogPost_Add />} />
          <Route path="job-post" element={<Employer_JobPost />} />
          <Route path="job-post/add" element={<Employer_JobPost_Add />} />
          <Route path="job-post/:id" element={<Employer_DetailJobPost />} />
        </Route>
        {/* USER*/}
        <Route path="/" element={<User_Layout />}>
          <Route index element={<User_Home />} />
          <Route path="login" element={<Login />} />
          <Route path="test" element={<Test />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<DetailBlog />} />
          <Route path="profile" element={<Infomation />} />
          <Route path="company/:userId" element={<CompanyDetail />}>
            <Route index element={<CompanyProfiles />} />
            <Route path="reviews" element={<CompanyReviews />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
