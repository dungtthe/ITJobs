import no_img_user from "@/assets/images/no_img_user.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const CompanyLogo = ({
  image,
  maxWidth = "300px",
  maxHeight = "300px",
}) => {
  let src = image;
  if (image === "no_img_user.png") {
    src = no_img_user;
  }

  const imageStyle = {
    objectFit: "cover",
    maxWidth: maxWidth,
    maxHeight: maxHeight,
  };

  return (
    <div className="border w-max h-max rounded-lg overflow-hidden">
      <img src={src} style={imageStyle} alt="Company logo" />
    </div>
  );
};
