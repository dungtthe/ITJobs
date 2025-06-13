import no_img_user from "@/assets/images/no_img_user.png";

export const CompanyLogo = ({ image, size = "100px" }) => {
  let src = image;
  if (image === "no_img_user.png") {
    src = no_img_user;
  }

  return (
    <div
      className="border rounded-lg overflow-hidden flex items-center justify-center bg-white"
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
