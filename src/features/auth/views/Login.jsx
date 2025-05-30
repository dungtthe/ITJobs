import Logo from "@/components/my-components/users/Logo";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { TiTick } from "react-icons/ti";

export default function Login() {
  // state check required
  const [notiRequiredEmail, setNotiRequiredEmail] = useState("");
  const [notiRequiredPass, setNotiRequiredPass] = useState("");

  //ref
  const inputEmailRef = useRef(null);
  const inputPassRef = useRef(null);

  const handleLoginWithGoogle = () => {
    alert("hihi");
  };

  const handleSubmit = () => {
    const email = inputEmailRef.current.value;
    const pass = inputPassRef.current.value;
    console.log(inputEmailRef.current.value);
    console.log(inputPassRef.current.value);

    if (email === "" || email === null) {
      setNotiRequiredEmail("required");
    } else {
      setNotiRequiredEmail("");
    }
    if (pass === "" || pass === null) {
      setNotiRequiredPass("required");
    } else {
      setNotiRequiredPass("");
    }
  };

  return (
    <>
      <div className="pt-9 pb-24 flex justify-between">
        {/* welcome, form */}
        <div className="w-[37%] ">
          {/* welcome */}
          <div className="flex">
            <h2 className="text-foreground text-2xl font-bold mr-3">
              Chào mừng bạn đến với
            </h2>
            <Logo as="h2" size="small" jobsColor="text-foreground" />
          </div>
          {/* policy */}
          <div className="mt-5">
            <span className="text-sm text-foreground/80 font-medium">
              Bằng việc đăng nhập, bạn đồng ý với các{" "}
            </span>
            <Link className="text-mlink font-medium text-sm">
              Điều khoản dịch vụ{" "}
            </Link>
            <span className="text-sm text-foreground/80 font-medium">và </span>
            <Link className="text-mlink font-medium text-sm">
              Chính sách quyền riêng tư{" "}
            </Link>
            <span className="text-sm text-foreground/80 font-medium">
              của ITJobs liên quan đến thông tin riêng tư của bạn.
            </span>
          </div>

          {/* form */}
          <div className="mt-8">
            {/* login gg */}
            <div
              onClick={handleLoginWithGoogle}
              className="flex w-full items-center justify-center gap-1.5 py-1.5 border border-primary rounded-md hover:bg-primary/10 transition-all hover:cursor-pointer"
            >
              <FcGoogle className="size-5"></FcGoogle>
              <button className="text-lg text-primary hover:cursor-pointer">
                Đăng nhập bằng Google
              </button>
            </div>
            {/* line */}
            <div className="flex items-center justify-center mt-2.5">
              <div className="h-[1px] bg-foreground/20 flex-1"></div>
              <span className="mx-3">hoặc</span>
              <div className="h-[1px] bg-foreground/20 flex-1"></div>
            </div>
            {/* input */}
            {/* email */}
            <div className="mt-4">
              <label className="text-sm">Email</label>
              <label className="ml-0.5 text-destructive">*</label>
            </div>
            <Input
              placeholder="Nhập email"
              className="selection:bg-primary/15 selection:text-foreground"
              ref={inputEmailRef}
            ></Input>
            {notiRequiredEmail === "required" && (
              <span className="text-xs text-destructive font-medium block mt-1">
                Email không được để trống
              </span>
            )}

            {/* pass */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <label className="text-sm">Mật khẩu</label>
                <label className="ml-0.5 text-destructive">*</label>
              </div>
              <Link className="text-mlink font-medium">Quên mật khẩu?</Link>
            </div>
            <Input
              placeholder="Nhập mật khẩu"
              type="password"
              ref={inputPassRef}
              className="selection:bg-primary/15 selection:text-foreground"
            ></Input>
            {notiRequiredPass === "required" && (
              <span className="text-xs text-destructive font-medium block mt-1">
                Mật khẩu không được để trống
              </span>
            )}

            {/* submit */}
            <Button
              onClick={handleSubmit}
              className="w-full py-5.5 mt-5 hover:cursor-pointer"
            >
              Đăng nhập
            </Button>
          </div>

          {/*  register */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <h4>Bạn chưa có tài khoản?</h4>
            <Link className="text-mlink font-medium">Đăng ký ngay</Link>
          </div>
        </div>
        {/* intro */}
        <div className="w-[53%] pt-15">
          <h2 className="font-semibold text-2xl">
            Đăng nhập để truy cập ngay vào hàng ngàn đánh giá và dữ liệu lương
            thị trường IT
          </h2>

          <ul>
            <li>
              <div className="flex items-center mt-5">
                <TiTick className="text-success size-6 mr-2"></TiTick>
                <span>
                  Xem trước mức lương để có thể lợi thế khi thoả thuận lương
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center mt-5">
                <TiTick className="text-success size-6 mr-2"></TiTick>
                <span>
                  Tìm hiểu về phúc lợi, con người, văn hóa công ty qua các đánh
                  giá chân thật
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center mt-5">
                <TiTick className="text-success size-6 mr-2"></TiTick>
                <span>Dễ dàng ứng tuyển chỉ với một thao tác</span>
              </div>
            </li>
            <li>
              <div className="flex items-center mt-5">
                <TiTick className="text-success size-6 mr-2"></TiTick>
                <span>Quản lý hồ sơ và quyền riêng tư của bạn</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
