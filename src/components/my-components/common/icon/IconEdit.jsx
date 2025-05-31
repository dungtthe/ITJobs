import { FaEdit } from "react-icons/fa";
import React from "react";
export const IconEdit = ({ className, ...props }) => {
  return (
    <FaEdit
      className={`size-7 text-primary/70 hover:cursor-pointer ${className}`}
      {...props}
    />
  );
};
