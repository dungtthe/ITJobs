import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarAdmin } from "@/layouts/admin/SidebarAdmin";
import { Outlet } from "react-router-dom";
import Header from "./Header";
export default function Index() {
  return (
    <>
      <SidebarProvider>
        <SidebarAdmin />
        <SidebarInset className="bg-background-secondary">
          <Header></Header>
          <main className="p-10">
            <div className="bg-background rounded-xl border pb-10">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
