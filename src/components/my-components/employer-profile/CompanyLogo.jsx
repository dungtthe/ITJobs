import no_img_user from "@/assets/images/no_img_user.png";
import { useNavigate } from "react-router-dom";
export const CompanyLogo = ({ image, size = "100px", userId = null }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (userId) {
      navigate(`/company/${userId}`);
    }
  };

  let src = image;
  if (image === "no_img_user.png") {
    src = no_img_user;
  }

  return (
    <div
      onClick={handleClick}
      className="border rounded-lg overflow-hidden flex items-center justify-center bg-white hover:cursor-pointer"
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src={src}
        alt="Company logo"
        className="max-w-full max-h-full object-contain p-2"
      />
    </div>
  );
};
