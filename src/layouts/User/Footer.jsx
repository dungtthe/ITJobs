import React from "react";
import { FiFacebook } from "react-icons/fi";
import { RiYoutubeLine } from "react-icons/ri";
import { SiInstagram } from "react-icons/si";
import Logo from "@/components/my-components/users/Logo";
export default function Footer() {
  return (
    <>
      <footer className="main-gradient py-18">
        <div className="container mx-auto">
          <div className="flex justify-between items-start text-secondary-foreground/60 gap-8">
            {/* logo and social*/}
            <div>
              <Logo as="div" size="large" />
              <p className="text-secondary-foreground pt-1.5">Job ít mà chất</p>
              <div>
                <div className="flex items-center gap-4 mt-4">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-secondary-foreground/30 hover:border-primary text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    <FiFacebook size={20} />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-secondary-foreground/30 hover:border-primary text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    <RiYoutubeLine size={24} />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-secondary-foreground/30 hover:border-primary text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    <SiInstagram size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Cột 1: Về ITJobs */}
            <ul className="space-y-2">
              <li className="text-secondary-foreground text-base font-medium">
                Về ITJobs
              </li>
              <li className="text-sm">Trang chủ</li>
              <li className="text-sm">Liên hệ</li>
              <li className="text-sm">Câu hỏi thường gặp</li>
              <li className="text-sm">Dịch vụ gợi ý ứng viên</li>
              <li className="text-sm">Việc làm IT</li>
            </ul>

            {/* Cột 2: Chương trình */}
            <ul className="space-y-2">
              <li className="text-secondary-foreground text-base font-medium">
                Chương trình
              </li>
              <li className="text-sm">Chuyện IT</li>
              <li className="text-sm">Cuộc thi viết</li>
              <li className="text-sm">Việc làm IT nổi bật</li>
              <li className="text-sm">Khảo sát thường niên</li>
            </ul>

            {/* Cột 3: Điều khoản chung */}
            <ul className="space-y-2">
              <li className="text-secondary-foreground text-base font-medium">
                Điều khoản chung
              </li>
              <li className="text-sm">Quy định bảo mật</li>
              <li className="text-sm">Quy chế hoạt động</li>
              <li className="text-sm">Giải quyết khiếu nại</li>
              <li className="text-sm">Thỏa thuận sử dụng</li>
              <li className="text-sm">Thông cáo báo chí</li>
            </ul>

            {/* Cột 4: Hỗ trợ nhà tuyển dụng */}
            <ul className="space-y-2">
              <li className="text-secondary-foreground text-base font-medium">
                Hỗ trợ nhà tuyển dụng
              </li>
              <li className="text-sm">Hồ Chí Minh: (+84) 977 460 519</li>
              <li className="text-sm">Hà Nội: (+84) 983 131 351</li>
              <li className="text-sm">Email: itjob@job.com</li>
              <li className="text-sm">Gửi thông tin liên hệ</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
