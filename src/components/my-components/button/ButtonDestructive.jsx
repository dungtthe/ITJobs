import { Button } from "@/components/ui/button";
export const ButtonDestructive = ({ content, className, ...props }) => {
  return (
    <Button
      {...props}
      className={`bg-destructive/80 hover:cursor-pointer hover:bg-destructive px-5 ${className}`}
    >
      {content}
    </Button>
  );
};
