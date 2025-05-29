import React from "react";
import "./style.css";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { TbFileCv } from "react-icons/tb";
import { MdHistory } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
export default function Header() {
  return (
    <>
      <header className="main-gradient py-3.5">
        <div className="flex justify-between items-center px-25">
          {/* logo */}
          <h1 className="flex items-center justify-start hover:cursor-pointer">
            <div className="flex items-center">
              <span className="relative inline-block">
                <div className="bg-primary w-8 h-10 rounded-full transform rotate-14 flex items-center justify-center">
                  <span className="text-secondary-foreground text-3xl font-bold transform -rotate-14">
                    it
                  </span>
                </div>
              </span>
              <span className="ml-1 font-bold text-secondary-foreground text-3xl">
                Jobs
              </span>
            </div>
          </h1>
          {/* login and avatar */}
          <div className="flex justify-end ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="size-11">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <span className="text-primary-foreground">Thế Dũng</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="hover:cursor-pointer">
                  <CgProfile className="size-5"></CgProfile>
                  <Link className="text-foreground/70 text-sm">
                    Thông tin cơ bản
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:cursor-pointer">
                  <TbFileCv className="size-5"></TbFileCv>
                  <Link className="text-foreground/70 text-sm">Quản lý CV</Link>
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
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:cursor-pointer ">
                  <CiLogout className="size-5 text-destructive"></CiLogout>
                  <Link className="text-destructive text-sm">Đăng xuất</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}
