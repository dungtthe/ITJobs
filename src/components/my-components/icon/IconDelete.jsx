import { MdDelete } from "react-icons/md";
import React from "react";
export const IconDelete = ({ className, ...props }) => {
  return (
    <MdDelete
      className={`size-7 text-destructive/70 hover:cursor-pointer ${className}`}
      {...props}
    />
  );
};
