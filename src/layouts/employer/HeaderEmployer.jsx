import Header from "@/components/my-components/Header";
import { useUserStore, useAccountBalanceStore } from "@/stores/authStore";
import no_img_user from "@/assets/images/no_img_user.png";
export default function HeaderEmployer() {
  const user = useUserStore((state) => state.user);
  const accountBalance = useAccountBalanceStore(
    (state) => state.accountBalance
  );
  let name = null;
  let image = null;

  if (user !== null) {
    name = user.name;
    image = user.image;
  }

  return (
    <>
      <Header
        name={name}
        avatartLink={image}
        profileLink="/employer/profile"
        isShowAccountBalance={true}
        accountBalance={accountBalance}
      ></Header>
    </>
  );
}
