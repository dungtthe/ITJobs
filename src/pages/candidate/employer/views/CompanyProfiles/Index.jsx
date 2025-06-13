import { useParams } from "react-router-dom";
import { getCompanyProfile } from "../../services/getCompanyProfile";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { GeneralInfo } from "@/components/my-components/employer-profile/GeneralInfo";
import { CompanyIntroduction } from "@/components/my-components/employer-profile/CompanyIntroduction";
import { OurSkills } from "@/components/my-components/employer-profile/OurSkills";
import { Locations } from "@/components/my-components/employer-profile/Locations";

export default function Index() {
  const { userId } = useParams();

  const [companyProfile, setCompanyProfile] = useState(null);
  useEffect(() => {
    getCompanyProfile(
      userId,
      (data) => {
        setCompanyProfile(data);
      },
      (error) => {},
      (exception) => {}
    );
  }, []);

  if (!companyProfile) {
    return (
      <div>
        <Skeleton className="h-[80vh] bg-accent/10"></Skeleton>
      </div>
    );
  }

  console.log("Company Profile Data:", companyProfile);

  //return <div>company profile {userId}</div>;
  return (
    <div>
      <div className="mt-5">
        <GeneralInfo
          bg="bg-card"
          isCanEdit={false}
          generalInfo={companyProfile.generalInfo}
          classNameRow="w-[30%] mt-5"
        ></GeneralInfo>
      </div>

      <div className="mt-5">
        <CompanyIntroduction
          bg="bg-card"
          companyIntroduction={companyProfile.companyIntroduction}
          isCanEdit={false}
        ></CompanyIntroduction>
      </div>
      <div className="mt-5">
        <OurSkills
          bg="bg-card"
          isCanEdit={false}
          skills={companyProfile.skills}
          title="Kỹ năng tuyển dụng chủ yếu của công ty"
        ></OurSkills>
      </div>
      <div className="mt-5">
        <Locations
          bg="bg-card"
          locations={companyProfile.locations}
          isCanEdit={false}
        ></Locations>
      </div>
    </div>
  );
}
