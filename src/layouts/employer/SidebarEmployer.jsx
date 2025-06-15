import React from "react";
import { MySidebar } from "@/components/my-components/MySideBar";
import { MdDashboard, MdLibraryBooks, MdOutlineSettings } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { PiReadCvLogoFill } from "react-icons/pi";
import { RiFilterFill } from "react-icons/ri";
import { IoChatboxEllipses } from "react-icons/io5";

const employerMenuConfig = [
  {
    path: "/employer",
    label: "Dashboard",
    icon: <MdDashboard />,
    key: "dashboard",
  },
  {
    path: "/employer/conversation",
    label: "Cuộc trò chuyện",
    icon: <IoChatboxEllipses />,
    key: "conversation",
  },
  {
    path: "/employer/candidate",
    label: "Quản lý ứng viên",
    icon: <FaUserCog />,
    key: "candidate",
  },
  {
    path: "/employer",
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
];

export function SidebarEmployer({ ...props }) {
  return (
    <MySidebar
      menuConfig={employerMenuConfig}
      title="IT Jobs"
      basePath=""
      {...props}
    />
  );
}
