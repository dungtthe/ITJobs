import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
export default function Header({ name, avatartLink, profileLink }) {
  const handleLogout = () => {
    alert("hihi logout");
  };
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-6">
        <SidebarTrigger></SidebarTrigger>
        {/* avatar and dropdown */}
        <div className="mr-8 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="size-11">
                  <AvatarImage src={avatartLink} />
                </Avatar>
                <span className="text-foreground/80">{name}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="hover:cursor-pointer">
                <CgProfile className="size-5"></CgProfile>
                <Link to={profileLink} className="text-foreground/70">
                  Thông tin tài khoản
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={handleLogout}
              >
                <CiLogout className="size-5 text-destructive"></CiLogout>
                <span className="text-destructive">Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
