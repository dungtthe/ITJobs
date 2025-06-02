import React from "react";
import { MySidebar } from "@/components/my-components/MySideBar";
import { MdDashboard, MdLibraryBooks, MdOutlineSettings } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { PiReadCvLogoFill } from "react-icons/pi";
import { RiFilterFill } from "react-icons/ri";

const employerMenuConfig = [];

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
