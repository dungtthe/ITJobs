import React from "react";
import { MySidebar } from "@/components/my-components/common/admin-employer/MySideBar";
import { MdDashboard, MdLibraryBooks, MdOutlineSettings } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { PiReadCvLogoFill } from "react-icons/pi";
import { RiFilterFill } from "react-icons/ri";

const adminMenuConfig = [
  {
    path: "/admin",
    label: "Dashboard",
    icon: <MdDashboard />,
    key: "dashboard",
  },
  {
    path: "/admin",
    label: "Quản lý người dùng",
    icon: <FaUserCog />,
    key: "users",
    children: [
      {
        path: "/employer",
        label: "Nhà tuyển dụng",
        key: "employer",
      },
      {
        path: "/candidate",
        label: "Ứng viên",
        key: "candidate",
      },
    ],
  },
  {
    path: "/admin",
    label: "Quản lý bài đăng",
    icon: <MdLibraryBooks />,
    key: "posts",
    children: [
      {
        path: "/blog-post",
        label: "Blog",
        key: "blog-post",
      },
      {
        path: "/job-post",
        label: "Bài đăng tuyển dụng",
        key: "job-post",
      },
    ],
  },
  {
    path: "/admin/search-filter",
    label: "Quản lý bộ lọc",
    icon: <RiFilterFill />,
    key: "search-filter",
  },
  {
    path: "/admin/cv-template",
    label: "Quản lý mẫu CV",
    icon: <PiReadCvLogoFill />,
    key: "cv-template",
  },
  {
    path: "/admin/system-value",
    label: "Tham số hệ thống",
    icon: <MdOutlineSettings />,
    key: "system-value",
  },
];

export function SidebarAdmin({ ...props }) {
  return (
    <MySidebar
      menuConfig={adminMenuConfig}
      title="IT Jobs"
      basePath=""
      {...props}
    />
  );
}
