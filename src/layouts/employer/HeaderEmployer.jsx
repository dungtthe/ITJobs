import Header from "@/components/my-components/Header";
import { useUserStore } from "@/stores/authStore";
import no_img_user from "@/assets/images/no_img_user.png";
export default function HeaderEmployer() {
  const user = useUserStore((state) => state.user);

  let name = null;
  let image = null;

  if (user !== null) {
    name = user.name;
    image = user.image;
    if (image === "no_img_user.png") {
      image = no_img_user;
    }
  }

  return (
    <>
      <Header
        name={name}
        avatartLink={image}
        profileLink="/employer/profile"
      ></Header>
    </>
  );
}
