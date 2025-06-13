import { useParams } from "react-router-dom";
import "@/layouts/candidate/style.css";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getJobPostById } from "@/pages/candidate/posts/job/services/getJobPostById";
import { CompanyLogo } from "@/components/my-components/employer-profile/CompanyLogo";
import StarRatings from "react-star-ratings";
import { Button } from "@/components/ui/button";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineHomeWork } from "react-icons/md";
import { getTimeAgo } from "@/utils/formatUtils";
import { FaRegClock } from "react-icons/fa";
import { Skill } from "@/components/my-components/employer-profile/Skill";
import { formatVND } from "@/utils/formatUtils";
import { getRandomJobPostsSummary } from "../services/getRandomJobPostsSummary";
import { JobPostSummaryCard } from "@/pages/candidate/shared-card/JobPostSummaryCard";
import { ApplyJobDialog } from "@/pages/candidate/posts/job/views/ApplyJobDialog";
export default function Detail() {
  const { id } = useParams();

  const [jobPost, setJobPost] = useState(null);
  const [randomJobPosts, setRandomJobPosts] = useState([]);
  useEffect(() => {
    getJobPostById(id, (data) => {
      setJobPost(data);
    });

    getRandomJobPostsSummary(id, 10, (data) => {
      console.log("Random Job Posts Data:", data);
      setRandomJobPosts(data);
    });
  }, []);
  if (!jobPost) {
    return <Skeleton className="h-[100vh] bg-accent/10" />;
  }
  return (
    <div>
      <div className="main-gradient curved-bottom  h-90 "></div>
      <div className="container mx-auto px-15 -mt-82 mb-15 z-10 relative">
        <div className="flex justify-between">
          {/* job detail */}
          <div className="w-[68%]">
            <div className="bg-card p-5 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">{jobPost.title}</h2>
              <ApplyJobDialog postId={id}>
                <Button className="w-full p-5 mt-5 text-lg hover:cursor-pointer">
                  Ứng tuyển ngay
                </Button>
              </ApplyJobDialog>
              <div className="flex mt-5 items-center gap-2 text-foreground/80">
                <CiLocationOn className="size-5"></CiLocationOn>
                <p className="font-semibold">
                  {" "}
                  {jobPost?.locationNames?.join(", ")}
                </p>
              </div>
              <div className="flex mt-3.5 items-center gap-2 text-foreground/80">
                <MdOutlineHomeWork className="size-5 text-foreground/60"></MdOutlineHomeWork>
                <p className="font-semibold">
                  {" "}
                  {jobPost?.workTypes?.join(", ")}
                </p>
              </div>
              <div className="flex mt-3.5 items-center gap-2 text-foreground/80">
                <FaRegClock className="size-4.5 text-foreground/60"></FaRegClock>
                <p className="font-semibold">
                  Đăng {getTimeAgo(jobPost.createAt)}
                </p>
              </div>
              <div className="border border-dashed w-full h-[1px] mt-3"></div>
              <div className="flex mt-3.5">
                <h5 className="min-w-[74px] font-medium">Kỹ năng: </h5>
                <div className="flex gap-2  items-center flex-wrap">
                  {jobPost?.skills?.map((item, index) => (
                    <div key={index}>
                      <Skill skillName={item} className="!m-0 text-sm" />
                    </div>
                  ))}
                </div>
              </div>

              {jobPost?.searchFilterRanges.length > 0 && (
                <div>
                  {jobPost.searchFilterRanges.map((range, index) => (
                    <div key={index} className="flex mt-3.5">
                      <h5 className="min-w-[74px] font-medium mr-2">
                        {range.name + ":"}
                      </h5>
                      {range.name === "Mức lương" ? (
                        <div>
                          {"Từ " + formatVND(range.min)} -{" "}
                          {formatVND(range.max)}
                        </div>
                      ) : (
                        <div>{"Từ " + range.min + " - " + range.max}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {jobPost?.searchFilterComboboxs.length > 0 && (
                <div>
                  {jobPost.searchFilterComboboxs.map((item, index) => (
                    <div key={index} className="flex mt-3.5">
                      <h5 className="min-w-[74px] font-medium mr-2">
                        {item.name + ":"}
                      </h5>
                      <span>{item?.values[0]}</span>
                    </div>
                  ))}
                </div>
              )}
              {jobPost?.searchFilterCheckBoxs.length > 0 && (
                <div>
                  {jobPost.searchFilterCheckBoxs.map((item, index) => (
                    <div key={index} className="flex mt-3.5">
                      <h5 className="min-w-[74px] font-medium mr-2">
                        {item.name + ":"}
                      </h5>
                      <span>{item?.values.join(", ")}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-card p-5 rounded-lg  mt-10 shadow-md">
              <div
                className="tinymce-content"
                dangerouslySetInnerHTML={{
                  __html: jobPost?.content,
                }}
              />
            </div>

            {randomJobPosts.length > 0 && (
              <div className="mt-10">
                <h5 className="mb-5 font-semibold text-foreground/70 text-xl">
                  Có thể bạn sẽ thích
                </h5>
                <div className="flex flex-wrap justify-between">
                  {randomJobPosts.map((jobPost) => (
                    <div key={jobPost.postId} className="w-[48%] mb-5">
                      <JobPostSummaryCard
                        jobPost={jobPost}
                        MAX_VISIBLE_SKILLS={5}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* employer */}
          <div className="w-[30%]">
            <div className="bg-card p-5 rounded-lg shadow-md">
              <div className="flex gap-3">
                <CompanyLogo
                  image={jobPost.companyImage}
                  userId={jobPost.userId}
                  size="150px"
                />
                <div>
                  <h4 className="text-xl font-semibold">
                    {jobPost.companyName}
                  </h4>

                  <div className="flex gap-2 items-center">
                    <StarRatings
                      className="mt-2"
                      rating={jobPost.averageRating}
                      starRatedColor="#edd30c"
                      starEmptyColor="#9ca3af"
                      numberOfStars={5}
                      starDimension="25px"
                      starSpacing="2px"
                      name="rating"
                    />
                    <span className="text-xl font-bold mt-1">
                      {jobPost.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              {jobPost.generalInfo && (
                <div>
                  {jobPost.generalInfo.map((info, index) => (
                    <div key={index} className="mt-2 ">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-foreground/70 line-clamp-1">
                          {info.title}:
                        </span>
                        <span className="font-medium line-clamp-1">
                          {info.description}
                        </span>
                      </div>
                      {index < jobPost.generalInfo.length - 1 && (
                        <div className="border border-dashed w-full h-[1px]"></div>
                      )}{" "}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
