import React, { useEffect, useState } from "react";
import { GeneralInfo } from "@/components/my-components/employer-profile/GeneralInfo";
import { getCompanyProfile } from "@/pages/employer/company-profile/services/getCompanyProfile";
import { CompanyIntroductionTex } from "./CompanyIntroductionTex";
import { OurSkills } from "@/components/my-components/employer-profile/OurSkills";
import { Locations } from "@/components/my-components/employer-profile/Locations";

import { OverviewInformation } from "@/components/my-components/employer-profile/OverviewInformation";
export default function Index() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getCompanyProfile(
      (sus) => {
        setProfile(sus);
        setIsLoading(false);
      },
      (fail) => {
        setProfile(null);
        setIsLoading(true);
      },
      (ex) => {
        setIsLoading(true);
        setProfile(null);
      }
    );
  }, []);

  if (isLoading) {
    return <>loading........</>;
  }

  return (
    <>
      <div>
        <div>
          <OverviewInformation
            image={profile.image}
            email={profile.email}
            phoneNumber={profile.phoneNumber}
            accountBalance={profile.accountBalance}
            companyName={profile.companyName}
            websiteUrl={profile.websiteUrl}
            companyType={profile.companyType}
            isCanEdit={true}
          ></OverviewInformation>
        </div>

        <div className="mt-10">
          <GeneralInfo
            isCanEdit={true}
            generalInfo={profile.generalInfo}
            classNameRow="w-[20%] mt-5"
          ></GeneralInfo>
        </div>
        <div className="mt-10">
          <OurSkills
            isCanEdit={true}
            skills={profile.skills}
            title="Kỹ năng tuyển dụng chủ yếu của công ty"
          ></OurSkills>
        </div>

        <div className="mt-10">
          <CompanyIntroductionTex
            companyIntroduction={profile.companyIntroduction}
          ></CompanyIntroductionTex>
        </div>

        <div className="mt-10">
          <Locations locations={profile.locations} isCanEdit={true}></Locations>
        </div>
      </div>
    </>
  );
}
