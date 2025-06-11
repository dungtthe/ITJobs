import { Overview } from "@/components/my-components/candidate/profile/Overview";
import { useEffect, useState } from "react";
import { getCandidateProfile } from "../services/getCandidateProfile";
import { Skeleton } from "@/components/ui/skeleton";
export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getCandidateProfile(
      (data) => {
        setProfile(data);
        setIsLoading(false);
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
      <div className="container mx-auto px-20 py-8">
        <Overview isCanEdit={true} profile={profile}></Overview>
      </div>
    </>
  );
}
