import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarEmployer } from "@/layouts/employer/SidebarEmployer";
import { Outlet } from "react-router-dom";
import Header from "./HeaderEmployer";
export default function Index() {
  return (
    <>
      <SidebarProvider>
        <SidebarEmployer />
        <SidebarInset className="bg-background-secondary">
          <Header></Header>
          <main className="p-10">
            <div>
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
