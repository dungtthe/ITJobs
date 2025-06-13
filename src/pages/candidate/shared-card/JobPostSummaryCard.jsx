import { getTimeAgo } from "@/utils/formatUtils";
import { CompanyLogo } from "@/components/my-components/employer-profile/CompanyLogo";
import { MdOutlineHomeWork } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { Skill } from "@/components/my-components/employer-profile/Skill";
export const JobPostSummaryCard = ({ jobPost }) => {
  const handleClick = (postId) => {
    alert(`${postId}`);
  };

  const MAX_VISIBLE_SKILLS = 4;
  return (
    <div
      className="bg-card rounded-lg p-4 pb-7 hover:cursor-pointer"
      onClick={() => handleClick(jobPost.postId)}
    >
      <p className=" font-medium text-foreground/50">
        Đăng {getTimeAgo(jobPost.createAt)}
      </p>
      <h3 className="font-bold text-foreground text-lg mt-2 line-clamp-2">
        {jobPost.title}
      </h3>
      <div className="mt-5 flex items-center gap-2">
        <CompanyLogo image={jobPost.image} size="70px" />
        <h4>{jobPost.companyName}</h4>
      </div>
      <div className="border border-dashed w-full h-[1px] mt-5"></div>

      <div className="flex mt-2 items-center gap-2 text-foreground/50">
        <MdOutlineHomeWork className="size-5"></MdOutlineHomeWork>
        <p className="text-sm font-semibold line-clamp-1">
          {" "}
          {jobPost?.workTypes?.join(", ")}
        </p>
      </div>
      <div className="flex mt-2 items-center gap-2 text-foreground/50">
        <CiLocationOn className="size-5"></CiLocationOn>
        <p className="text-sm font-semibold">
          {" "}
          {jobPost?.locationNames?.join(", ")}
        </p>
      </div>
      <div>
        <div className="flex gap-2 mt-2 items-center ">
          {jobPost?.skills?.slice(0, MAX_VISIBLE_SKILLS).map((item, index) => (
            <div key={index}>
              <Skill skillName={item} className="!m-0" />
            </div>
          ))}
          {jobPost?.skills?.length > MAX_VISIBLE_SKILLS && (
            <span className=" text-sm">
              +{jobPost.skills.length - MAX_VISIBLE_SKILLS}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
