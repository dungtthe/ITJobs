import React from "react";
import { FaEye } from "react-icons/fa";
export const IconEye = ({ className, ...props }) => {
  return (
    <FaEye
      {...props}
      className={`size-6 hover:cursor-pointer p-1.5 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors ${className}`}
    ></FaEye>
  );
};
