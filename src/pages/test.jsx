import { MdErrorOutline } from "react-icons/md";
import { TiTick } from "react-icons/ti";

export default function Test() {
  return (
    <div className="container mx-auto pb-1000 pt-100">
      {/* toast error */}
      <div className="text-destructive bg-destructive/5 p-3 rounded-md">
        <div className="flex items-center gap-2 ">
          <MdErrorOutline className="size-5"></MdErrorOutline>
          <p>Thất bại</p>
        </div>
        <p className="text-destructive/80 text-sm mt-1">
          Thông tin tin khoản hoặc mật khẩu không chính xác
        </p>
      </div>

      {/* toast success */}
      <div className="text-success bg-success/5 p-3 rounded-md">
        <div className="flex items-center gap-2 ">
          <TiTick className="size-5"></TiTick>
          <p>Đăng nhập thành công</p>
        </div>
        <p className="text-success/80 text-sm mt-1">
          Xin chào Dung, chúc bạn tìm được công việc phù hợp với mình!
        </p>
      </div>
    </div>
  );
}
