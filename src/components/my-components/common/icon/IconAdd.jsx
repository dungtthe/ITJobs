import { IoMdAddCircleOutline } from "react-icons/io";
import React from "react";
export const IconAdd = ({ className, ...props }) => {
  return (
    <IoMdAddCircleOutline
      className={`size-7 text-success/70 hover:cursor-pointer ${className}`}
      {...props}
    />
  );
};
