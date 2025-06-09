import { Input } from "@/components/ui/input";
import React, { useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";

export const SearchFilterInput = ({
  placeholder,
  onSearch,
  defaultValue = "",
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const inputRef = useRef(null);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-between gap-15">
      <input
        ref={inputRef}
        className="h-[55px] bg-muted w-full rounded-md px-6"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div
        className="flex items-center justify-center gap-2 bg-primary w-[180px] h-[55px] text-muted rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
        onClick={handleSearch}
      >
        <CiSearch className="size-6" />
        <div>Tìm kiếm</div>
      </div>
    </div>
  );
};
