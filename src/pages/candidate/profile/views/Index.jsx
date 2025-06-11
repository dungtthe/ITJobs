import { Overview } from "@/components/my-components/candidate/profile/Overview";
import { useEffect, useState } from "react";
import { getCandidateProfile } from "../services/getCandidateProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { CandidateIntroductionTex } from "./CandidateIntroductionTex";
import { CVs } from "@/components/my-components/candidate/profile/CVs";
export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getCandidateProfile(
      (data) => {
        setProfile(data);
        setIsLoading(false);
        console.log("Profile data:", data);
      },
      () => {
        setIsLoading(true);
      },
      () => {
        setIsLoading(true);
      }
    );
  }, []);

  if (isLoading) {
    return (
      <>
        <Skeleton className="h-[80vh] container mx-auto bg-accent/10"></Skeleton>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto px-30 py-8">
        <Overview isCanEdit={true} profile={profile}></Overview>
        <div className="mt-8 ">
          <CandidateIntroductionTex
            candidateIntroduction={profile.aboutMe}
            isCanEdit={true}
          ></CandidateIntroductionTex>
        </div>
        <div className="mt-8">
          <CVs isCanEdit={true} cvLinks={profile.cVs} />
        </div>
      </div>
    </>
  );
}
