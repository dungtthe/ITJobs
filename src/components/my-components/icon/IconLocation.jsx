import { IoLocationOutline } from "react-icons/io5";
export const IconLocation = ({ className, ...props }) => {
  return (
    <div>
      <IoLocationOutline
        className={`size-5 text-primary/70 hover:cursor-pointer ${className}`}
        {...props}
      />
    </div>
  );
};
