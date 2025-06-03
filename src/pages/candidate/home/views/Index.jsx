import React from "react";
import { SearchFilter } from "@/components/my-components/search-filter/SearchFilter";
export default function Index() {
  return (
    <div>
      <h1 className="font-bold text-3xl">User Home</h1>
      <SearchFilter></SearchFilter>
    </div>
  );
}
