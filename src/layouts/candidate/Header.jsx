import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { TbFileCv } from "react-icons/tb";
import { Link } from "react-router-dom";
import "./style.css";
import Logo from "@/components/my-components/candidate/Logo";
import { useUserStore } from "@/stores/authStore";
import no_img_user from "@/assets/images/no_img_user.png";

export default function Header() {
  const user = useUserStore((state) => state.user);

  let name = null;
  let image = null;

  if (user !== null) {
    name = user.name;
    image = user.image;
    if (image === "no_img_user.png") {
      image = no_img_user;
    }
  }

  return (
    <>
      <header className="main-gradient py-3.5 border-b border-border/15 sticky top-0 z-50">
        <div className="flex justify-between items-center px-25">
          <div className="flex items-center">
            {/* logo */}
            <Logo as="h1" size="medium" />
            <div className="ml-8">
              <Link className="text-secondary-foreground/80">Việc làm IT</Link>
              <Link to="/blog" className="ml-5 text-secondary-foreground/80">
                Blog
              </Link>
            </div>
          </div>

          {/* login and avatar */}
          <div className="flex justify-end ">
            {user === null ? (
              <Link
                to="/login"
                className="text-secondary-foreground font-medium"
              >
                Đăng nhập/ Đăng ký
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="size-11">
                      <AvatarImage src={image} />
                    </Avatar>
                    <span className="text-primary-foreground">{name}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="hover:cursor-pointer">
                    <CgProfile className="size-5"></CgProfile>
                    <Link to="/profile" className="text-foreground/70 text-sm">
                      Thông tin cá nhân
                    </Link>
                  </DropdownMenuItem>

                  {/* <DropdownMenuItem className="hover:cursor-pointer">
                    <TbFileCv className="size-5"></TbFileCv>
                    <Link className="text-foreground/70 text-sm">
                      Quản lý CV
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="hover:cursor-pointer">
                    <MdHistory className="size-5"></MdHistory>
                    <Link className="text-foreground/70 text-sm">
                      Lịch sử ứng tuyển
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="hover:cursor-pointer">
                    <IoPersonAddOutline className="size-5"></IoPersonAddOutline>
                    <Link className="text-foreground/70 text-sm">
                      Nhà tuyển dụng theo dõi
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="hover:cursor-pointer">
                    <IoMdHeartEmpty className="size-5"></IoMdHeartEmpty>
                    <Link className="text-foreground/70 text-sm">
                      Bài đăng đã thích
                    </Link>
                  </DropdownMenuItem> */}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:cursor-pointer ">
                    <CiLogout className="size-5 text-destructive"></CiLogout>
                    <Link className="text-destructive text-sm">Đăng xuất</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
