import { Button } from "@/components/ui/button";

export const ButtonSuccess = ({ content, className, ...props }) => {
  return (
    <Button
      {...props}
      className={`bg-success/80 hover:cursor-pointer hover:bg-success px-5 ${className}`}
    >
      {content}
    </Button>
  );
};
