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
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";
export function AppSidebar({ ...props }) {
  //const css
  const SidebarMenuItem_MB = "mb-1.5";

  //const link
  const LINK_TO_DASHBOARD = "/admin";

  const location = useLocation();
  // Hàm kiểm tra xem một path có đang active hay không
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Kiểm tra menu parent có active không (khi một submenu active)
  const isSubmenuActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-sidebar-border shadow-sm"
      {...props}
    >
      <SidebarHeader className="py-4 px-3">
        <div className="flex items-center justify-center">
          <span className="text-primary font-bold text-2xl">IT</span>
          <span className="text-foreground font-bold text-2xl">Jobs</span>
        </div>
        <Separator className="mt-4 bg-sidebar-border/50" />
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* <SidebarGroupLabel className="px-3  text-xs font-medium uppercase tracking-wider text-sidebar-foreground/60">
          Quản lý hệ thống
        </SidebarGroupLabel> */}

        <SidebarGroup>
          <SidebarMenu>
            {/* Dashboard */}
            <SidebarMenuItem className={`${SidebarMenuItem_MB}`}>
              <SidebarMenuButton
                asChild
                className={`transition-colors rounded-md ${
                  isActive(LINK_TO_DASHBOARD)
                    ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary shadow-sm hover:bg-gradient-to-r hover:from-primary/25 hover:to-primary/10 hover:text-primary"
                    : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Link to={`${LINK_TO_DASHBOARD}`} className="flex items-center">
                  <div className="w-5.5 h-5.5 mr-2 flex items-center justify-center text-foreground">
                    <MdDashboard
                      className={`${
                        isActive("/admin") ? "text-primary" : ""
                      } w-full h-full text-foreground/75`}
                    />
                  </div>
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* users */}
            <Collapsible asChild className="group/collapsible">
              <SidebarMenuItem className={`${SidebarMenuItem_MB}`}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={`transition-colors rounded-md ${
                      isSubmenuActive(["/admin/employer", "/admin/candidate"])
                        ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary shadow-sm hover:bg-gradient-to-r hover:from-primary/25 hover:to-primary/10 hover:text-primary"
                        : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <div className="w-5.5 h-5.5 mr-2 flex items-center justify-center text-foreground">
                      <FaUserCog
                        className={`${
                          isSubmenuActive([
                            "/admin/employer",
                            "/admin/candidate",
                          ])
                            ? "text-primary"
                            : ""
                        } w-full h-full text-foreground/75`}
                      />
                    </div>
                    <span>Quản lý người dùng</span>
                    <ChevronRight
                      className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                        isSubmenuActive(["/admin/employer", "/admin/candidate"])
                          ? "text-primary/70"
                          : "text-sidebar-foreground/60"
                      } group-data-[state=open]/collapsible:rotate-90`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="border-l-2 border-sidebar-border/50 ml-2.5 pl-2 my-1">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        className={`hover:bg-sidebar-accent/50 transition-colors px-3 ${
                          isActive("/admin/employer")
                            ? "bg-gradient-to-r from-primary/10 to-primary/3 text-primary"
                            : ""
                        }`}
                      >
                        <Link to="/admin/employer">
                          <span
                            className={`${
                              isActive("/admin/employer")
                                ? "text-primary"
                                : "text-sidebar-foreground/80"
                            } text-sm`}
                          >
                            Nhà tuyển dụng
                          </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        className={`hover:bg-sidebar-accent/50 transition-colors px-3 ${
                          isActive("/admin/candidate")
                            ? "bg-gradient-to-r from-primary/10 to-primary/3 text-primary"
                            : ""
                        }`}
                      >
                        <Link to="/admin/candidate">
                          <span
                            className={`${
                              isActive("/admin/candidate")
                                ? "text-primary"
                                : "text-sidebar-foreground/80"
                            } text-sm`}
                          >
                            Ứng viên
                          </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* bài đăng */}
            <Collapsible asChild className="group/collapsible">
              <SidebarMenuItem className={`${SidebarMenuItem_MB}`}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={`transition-colors rounded-md ${
                      isSubmenuActive(["/admin/blog-post", "/admin/job-post"])
                        ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary shadow-sm hover:bg-gradient-to-r hover:from-primary/25 hover:to-primary/10 hover:text-primary"
                        : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <div className="w-5.5 h-5.5 mr-2 flex items-center justify-center text-foreground">
                      <MdLibraryBooks
                        className={`${
                          isSubmenuActive([
                            "/admin/blog-post",
                            "/admin/job-post",
                          ])
                            ? "text-primary"
                            : ""
                        } w-full h-full text-foreground/75`}
                      />
                    </div>
                    <span>Quản lý bài đăng</span>
                    <ChevronRight
                      className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                        isSubmenuActive(["/admin/blog-post", "/admin/job-post"])
                          ? "text-primary/70"
                          : "text-sidebar-foreground/60"
                      } group-data-[state=open]/collapsible:rotate-90`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="border-l-2 border-sidebar-border/50 ml-2.5 pl-2 my-1">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        className={`hover:bg-sidebar-accent/50 transition-colors px-3 ${
                          isActive("/admin/blog-post")
                            ? "bg-gradient-to-r from-primary/10 to-primary/3 text-primary"
                            : ""
                        }`}
                      >
                        <Link to="/admin/blog-post">
                          <span
                            className={`${
                              isActive("/admin/blog-post")
                                ? "text-primary"
                                : "text-sidebar-foreground/80"
                            } text-sm`}
                          >
                            Blog
                          </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        className={`hover:bg-sidebar-accent/50 transition-colors px-3 ${
                          isActive("/admin/job-post")
                            ? "bg-gradient-to-r from-primary/10 to-primary/3 text-primary"
                            : ""
                        }`}
                      >
                        <Link to="/admin/job-post">
                          <span
                            className={`${
                              isActive("/admin/job-post")
                                ? "text-primary"
                                : "text-sidebar-foreground/80"
                            } text-sm`}
                          >
                            Bài đăng tuyển dụng
                          </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* bộ lọc tìm kiếm */}
            <SidebarMenuItem className={`${SidebarMenuItem_MB}`}>
              <SidebarMenuButton
                asChild
                className={`transition-colors rounded-md ${
                  isActive("/admin/search-filter")
                    ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary shadow-sm hover:bg-gradient-to-r hover:from-primary/25 hover:to-primary/10 hover:text-primary"
                    : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Link to="/admin/search-filter" className="flex items-center">
                  <div className="w-5.5 h-5.5 mr-2 flex items-center justify-center text-foreground">
                    <RiFilterFill
                      className={`${
                        isActive("/admin/search-filter") ? "text-primary" : ""
                      } w-full h-full text-foreground/75`}
                    />
                  </div>
                  <span>Quản lý bộ lọc</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* mẫu CV*/}
            <SidebarMenuItem className={`${SidebarMenuItem_MB}`}>
              <SidebarMenuButton
                asChild
                className={`transition-colors rounded-md ${
                  isActive("/admin/cv-template")
                    ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary shadow-sm hover:bg-gradient-to-r hover:from-primary/25 hover:to-primary/10 hover:text-primary"
                    : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Link to="/admin/cv-template" className="flex items-center">
                  <div className="w-5.5 h-5.5 mr-2 flex items-center justify-center text-foreground">
                    <PiReadCvLogoFill
                      className={`${
                        isActive("/admin/cv-template") ? "text-primary" : ""
                      } w-full h-full text-foreground/75`}
                    />
                  </div>
                  <span>Quản lý mẫu CV</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* <SidebarGroupLabel className="px-3 mt-4 mb-1 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/60">
              Cấu hình
            </SidebarGroupLabel> */}

            {/* system value*/}
            <SidebarMenuItem className={`${SidebarMenuItem_MB}`}>
              <SidebarMenuButton
                asChild
                className={`transition-colors rounded-md ${
                  isActive("/admin/system-value")
                    ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary shadow-sm hover:bg-gradient-to-r hover:from-primary/25 hover:to-primary/10 hover:text-primary"
                    : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Link to="/admin/system-value" className="flex items-center">
                  <div className="w-5.5 h-5.5 mr-2 flex items-center justify-center text-foreground">
                    <MdOutlineSettings
                      className={`${
                        isActive("/admin/system-value") ? "text-primary" : ""
                      } w-full h-full text-foreground/75`}
                    />
                  </div>
                  <span>Tham số hệ thống</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* <SidebarFooter className="mt-auto border-t border-sidebar-border/50 p-2">
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <Link to="#" className="flex items-center">
              <BiLogOut className="h-5 w-5 mr-2" />
              <span className="font-medium">Đăng xuất</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter> */}
    </Sidebar>
  );
}
