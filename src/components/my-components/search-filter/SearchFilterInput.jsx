import { Input } from "@/components/ui/input";
import React from "react";
import { CiSearch } from "react-icons/ci";
export const SearchFilterInput = ({ placeholder, ...props }) => {
  return (
    <div className="flex items-center justify-between gap-15">
      <input
        className="h-[55px] bg-muted w-full rounded-md px-6"
        placeholder={placeholder}
        {...props}
      ></input>
      <div className="flex items-center justify-center gap-2 bg-primary w-[180px] h-[55px] text-muted rounded-md">
        <CiSearch className="size-6"></CiSearch>
        <div>Tìm kiếm</div>
      </div>
    </div>
  );
};
