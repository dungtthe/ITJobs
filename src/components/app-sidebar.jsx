import * as React from "react";
import { MdDashboard } from "react-icons/md";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { MdLibraryBooks } from "react-icons/md";
import { RiFilterFill } from "react-icons/ri";
import { PiReadCvLogoFill } from "react-icons/pi";
import { MdOutlineSettings } from "react-icons/md";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuButton,
  SidebarMenu,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { BiLogOut } from "react-icons/bi";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FaUserCog } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarGroupLabel, SidebarMenuAction } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {/* Dashboard */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/admin">
                  <MdDashboard></MdDashboard>
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* users */}
            <Collapsible asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <FaUserCog />
                    <span>Quản lý người dùng</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {/* nhà tuyển dụng */}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/admin/employer">
                          <span>Nhà tuyển dụng</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    {/* nhà tuyển dụng */}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/admin/candidate">
                          <span>Ứng viên</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* bài đăng */}
            {/* users */}
            <Collapsible asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <MdLibraryBooks />
                    <span>Quản lý bài đăng</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {/* nhà tuyển dụng */}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="#">
                          <span>Blog</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    {/* nhà tuyển dụng */}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="#">
                          <span>Bài đăng tuyển dụng</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* bộ lọc tìm kiếm */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="#">
                  <RiFilterFill />
                  <span>Quản lý bộ lọc tìm kiếm</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* mẫu CV*/}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="#">
                  <PiReadCvLogoFill />
                  <span>Quản lý mẫu CV</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* system value*/}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="#">
                  <MdOutlineSettings />
                  <span>Tham số hệ thống</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter className="list-none mb-40">
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="#">
              <BiLogOut />
              <span>Đăng xuất</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter> */}
    </Sidebar>
  );
}
