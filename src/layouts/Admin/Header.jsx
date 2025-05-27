import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
export default function Header() {
  return (
    <header className="bg-background border-b border-border">
      <div className="flex h-16 items-center justify-between px-4">
        <SidebarTrigger></SidebarTrigger>

        {/* Avatar + Dropdown Container */}
        <div className="relative hidden md:block ml-auto mr-50">
          <div className="group relative">
            <div className="flex items-center">
              {/* Avatar */}
              <div className="overflow-hidden rounded-full border border-border shadow-sm cursor-pointer hover:border-primary/50 transition-colors">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Avatar"
                  className="size-10 object-cover"
                />
              </div>
              <span className="ml-1">Nguyễn Văn A</span>
            </div>

            {/* Dropdown Menu */}
            <div
              className="absolute left-0 z-10 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible
                divide-y divide-border rounded-md border border-border bg-popover shadow-md transition-all duration-200"
              role="menu"
            >
              <div className="p-2">
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Thông tin cá nhân
                </a>
              </div>

              <div className="p-2">
                <form method="POST" action="#">
                  <button
                    type="submit"
                    className=" cursor-pointer flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                      />
                    </svg>
                    Đăng xuất
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
