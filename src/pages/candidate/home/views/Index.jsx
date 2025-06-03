import React, { useRef } from "react";
import { SearchFilterInput } from "@/components/my-components/search-filter/SearchFilterInput";
import { Skill } from "@/components/my-components/employer-profile/Skill";
import hot1 from "@/assets/images/hot1.png";
import user_profile from "@/assets/images/user-profile.svg";
import cv_template from "@/assets/images/cv-template.svg";
import blog from "@/assets/images/blog.svg";
import { useEffect, useState } from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { getSuggestedSkills } from "../services/getSuggestedSkills";
import { getTopEmployersByApplicationsSummary } from "../services/getTopEmployersByApplicationsSummary";
import { EmployerSummary } from "./EmployerSummary.jsx";
import { getTopBlogPostsByViewCountSummary } from "../services/getTopBlogPostsByViewCountSummary";
import { BlogPostSummary } from "./BlogPostSummary.jsx";
export default function Index() {
  const [skillsSuggested, SetSkillsSuggested] = useState([]);
  const [employersTop, SetEmployersTop] = useState([]);
  const [blogsTop, SetBlogsTop] = useState([]);

  useEffect(() => {
    getSuggestedSkills(
      8,
      (sus) => {
        SetSkillsSuggested(sus);
      },
      () => {},
      () => {}
    );

    getTopEmployersByApplicationsSummary(
      9,
      (sus) => {
        SetEmployersTop(sus.items);
      },
      () => {},
      () => {}
    );

    getTopBlogPostsByViewCountSummary(
      9,
      (sus) => {
        SetBlogsTop(sus.items);
      },
      () => {},
      () => {}
    );
  }, []);

  return (
    <div>
      {/* section-search */}
      <div className="main-gradient py-20">
        <div className="container mx-auto px-30">
          <h2 className="text-secondary-foreground text-3xl font-bold mb-8">
            1,006 Việc làm IT cho Developer "Chất"
          </h2>
          <SearchFilterInput placeholder="Nhập từ khóa theo kỹ năng, công ty,..."></SearchFilterInput>
          {/* recommend skill*/}
          <div className="flex text-secondary-foreground/80 justify-start items-center mt-5">
            <div>Gợi ý cho bạn</div>
            <div>
              <div className="px-1 flex flex-wrap justify-start">
                {skillsSuggested.map((item) => (
                  <div key={crypto.randomUUID()}>
                    <Skill
                      className="bg-transparent border-secondary-foreground/20"
                      skillName={item}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* k bit goi la gi hihi */}
      <div className="bg-gray-100 py-5 flex justify-center items-center gap-4 border-b">
        <img className="size-6" src={hot1}></img>
        <h4 className="font-bold text-base">Khám phá Lời mời công việc</h4>
        <p className="text-base font-medium">
          Cập nhật CV mới nhất để x2 tốc độ tìm việc
        </p>
        <FaRegArrowAltCircleRight className="size-4 text-primary"></FaRegArrowAltCircleRight>
      </div>

      {/* content */}
      <div className="mt-10 container mx-auto px-30">
        {/* feature  */}
        <div>
          <h2 className="text-3xl font-bold text-center">
            Công cụ tốt nhất cho hành trang ứng tuyển của bạn
          </h2>
          <div className="flex mt-10 gap-10">
            <div className="flex bg-background-secondary items-start pt-10 pb-5 px-8 rounded-xl">
              <img src={user_profile}></img>
              <div className="ml-4 pt-2">
                <h4 className="font-bold text-lg">Hồ sơ cá nhân</h4>
                <p className="text-foreground/80 mt-2">
                  Kiến tạo hồ sơ ITviec với cấu trúc chuẩn mực cùng các gợi ý
                  chi tiết
                </p>
                <div className="border border-primary py-2 text-center w-fit px-5 rounded-md mt-6 text-primary font-bold hover:cursor-pointer hover:bg-primary/10 transition-all">
                  Cập nhật hồ sơ
                </div>
              </div>
            </div>

            <div className="flex bg-background-secondary items-start pt-10 pb-5 px-8 rounded-xl">
              <img src={cv_template}></img>
              <div className="ml-4 pt-2">
                <h4 className="font-bold text-lg">Mẫu CV</h4>
                <p className="text-foreground/80 mt-2">
                  Nâng cấp CV với các mẫu CV IT chuyên nghiệp - được nhà tuyển
                  dụng đề xuất
                </p>
                <div className="border border-primary py-2 text-center w-fit px-5 rounded-md mt-6 text-primary-foreground bg-primary font-bold hover:cursor-pointer hover:bg-accent transition-all">
                  Xem mẫu CV
                </div>
              </div>
            </div>

            <div className="flex bg-background-secondary items-start pt-10 pb-5 px-8 rounded-xl">
              <img src={blog}></img>
              <div className="ml-4 pt-2">
                <h4 className="font-bold text-lg">Blog về IT</h4>
                <p className="text-foreground/80 mt-2">
                  Cập nhật thông tin lương thưởng, nghề nghiệp và kiến thức
                  ngành IT
                </p>
                <div className="border border-primary py-2 text-center w-fit px-5 rounded-md mt-6 text-primary font-bold hover:cursor-pointer hover:bg-primary/10 transition-all">
                  Khám phá blog
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* top employer */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center">
            Nhà tuyển dụng hàng đầu
          </h2>
          <div className="flex mt-10 flex-wrap">
            {employersTop.map((item) => (
              <div key={item.id} className="w-1/3 px-5 mb-10">
                <EmployerSummary ratio={16 / 9} employer={item} />
              </div>
            ))}
          </div>
        </div>

        {/* top Blog-post */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-left ml-10">
            Bài viết nổi bật
          </h2>
          <div className="flex mt-10 flex-wrap">
            {blogsTop.map((item) => (
              <div key={item.id} className="w-1/3 px-4 mb-10">
                <BlogPostSummary
                  ratio={16 / 9}
                  blog={item}
                  lineClampShortContent="line-clamp-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
