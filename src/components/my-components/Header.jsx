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
import { useNavigate } from "react-router-dom";
import { useUserStore, removeJwtToken } from "@/stores/authStore";
import { formatVND } from "@/utils/formatUtils";
import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Header({
  name,
  avatartLink,
  profileLink,
  accountBalance = 0,
  isShowAccountBalance = false,
}) {
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();
  const handleLogout = () => {
    //tam thoi nhu nay da
    navigate("/login");
    clearUser();
    removeJwtToken();
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
                {isShowAccountBalance && (
                  <span className="mr-5">
                    Số dư: {formatVND(accountBalance)}
                  </span>
                )}
                <Avatar className="h-10 w-10 ">
                  <AvatarImage src={avatartLink} alt="Hình ảnh" />
                  <AvatarFallback className="bg-muted">
                    <FaUser className="h-6 w-6 text-muted-foreground" />
                  </AvatarFallback>
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
