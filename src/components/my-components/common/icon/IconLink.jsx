import { FaLink } from "react-icons/fa6";
import React from "react";
export const IconLink = ({ link, className, ...props }) => {
  const handleClick = () => {
    window.open(link, "_blank");
  };
  return (
    <FaLink
      onClick={handleClick}
      className={`size-6 text-mlink/70 hover:cursor-pointer ${className}`}
      {...props}
    />
  );
};
