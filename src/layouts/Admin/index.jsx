import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset } from "@/components/ui/sidebar";
export default function LayoutAdmin() {
  // return (
  //   <>
  //     <SidebarProvider>
  //       <AppSidebar></AppSidebar>
  //       {/* <SidebarTrigger /> */}
  //       <div>
  //         <Header />
  //         <main>
  //           <Outlet />
  //         </main>
  //         <Footer />
  //       </div>
  //     </SidebarProvider>
  //   </>
  // );

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header></Header>
          <main>
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
