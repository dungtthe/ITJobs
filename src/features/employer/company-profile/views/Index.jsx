import React, { useEffect, useState } from "react";
import { GeneralInfo } from "@/components/my-components/common/employer-profile/GeneralInfo";
import { getCompanyProfile } from "@/features/employer/company-profile/usecases/queries/getCompanyProfile";
import { CompanyIntroduction } from "./CompanyIntroduction";
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
        <GeneralInfo
          isCanEdit={true}
          generalInfo={profile.generalInfo}
          classNameRow="w-[20%] mt-5"
        ></GeneralInfo>
        <div className="mt-10">
          <CompanyIntroduction></CompanyIntroduction>
        </div>
      </div>
    </>
  );
}
