import { getEmployerSummary } from "../services/getEmployerSummary";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "@/layouts/candidate/style.css";
import { CompanyLogo } from "@/components/my-components/employer-profile/CompanyLogo";
import { CiLocationOn } from "react-icons/ci";
import React from "react";
import { Button } from "@/components/ui/button";
import StarRatings from "react-star-ratings";
import { Skeleton } from "@/components/ui/skeleton";
import { Outlet } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";

export default function Index() {
  const location = useLocation();
  const isReviewActive = location.pathname.endsWith("/reviews");

  const { userId } = useParams();
  const [employerSummary, setEmployerSummary] = useState(null);
  useEffect(() => {
    getEmployerSummary(
      userId,
      (data) => {
        console.log("Employer Summary Data:", data);
        setEmployerSummary(data);
      },
      (error) => {
        console.error("Error fetching employer summary:", error);
      },
      (exception) => {
        console.error("Exception fetching employer summary:", exception);
      }
    );
  }, []);

  if (!employerSummary) {
    return (
      <div>
        <Skeleton className="h-[80vh] bg-accent/10"></Skeleton>
      </div>
    );
  }
  return (
    <div>
      <div className="main-gradient py-10">
        <div className="container mx-auto px-15 flex justify-between items-center text-secondary-foreground">
          <div className="flex gap-5">
            <CompanyLogo image={employerSummary.image} size="150px" />
            <div>
              <h2 className="text-3xl font-bold">
                {employerSummary.companyName}
              </h2>
              {employerSummary.locationNames.length > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  <CiLocationOn className="size-5" />
                  <p>{employerSummary.locationNames.join(", ")}</p>
                </div>
              )}
              <div className="mt-5">
                <Button className="min-w-[150px] py-5.5 font-bold rounded-sm hover:cursor-pointer">
                  Viết đánh giá
                </Button>
                <Button className="ml-5 min-w-[150px] py-5.5 font-bold rounded-sm hover:cursor-pointer bg-card text-primary hover:bg-primary/10 hover:text-secondary-foreground">
                  Theo dõi
                </Button>
              </div>
            </div>

            <div></div>
          </div>

          {/* rating */}
          {employerSummary.totalReviews > 0 && (
            <div className="bg-muted/5 px-5 py-5 rounded-sm">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">
                  {employerSummary.averageRating.toFixed(1)}
                </span>
                <div className="flex flex-col ml-1">
                  <StarRatings
                    rating={employerSummary.averageRating}
                    starRatedColor="#FFD700"
                    starEmptyColor="#ffff"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                  <span className="mt-1">
                    {employerSummary.totalReviews} đánh giá
                  </span>
                </div>

                <span className="max-w-[150px] text-sm font-semibold ml-4">
                  {Math.round(
                    (employerSummary.totalRecommended /
                      employerSummary.totalReviews) *
                      100
                  )}
                  % khuyến khích làm việc tại đây
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* content */}
      <div className="container mx-auto px-15 mt-10 mb-10">
        <div className="flex justify-between">
          {/* company  */}
          <div className="w-[71%] ">
            {/* navigation */}
            <div className="bg-card rounded-xl p-5 flex gap-5 font-bold text-foreground/60 items-center">
              <div>
                <NavLink
                  to={``}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-accent  border-accent pb-2 border-b-2"
                      : "font-bold"
                  }
                >
                  Giới thiệu
                </NavLink>
              </div>

              <div className="flex justify-center items-center gap-2">
                <NavLink
                  to={`reviews`}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-accent border-accent pb-2 border-b-2"
                      : "font-bold"
                  }
                >
                  Đánh giá
                </NavLink>
                <span
                  className={`rounded-2xl px-2 py-1 ${
                    isReviewActive
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary/10"
                  }`}
                >
                  {employerSummary.totalReviews}
                </span>
              </div>
            </div>
            {/* content  */}
            <div>
              <Outlet />
            </div>
          </div>
          {/* job posts */}
          <div className="w-[27%] "></div>
        </div>
      </div>
    </div>
  );
}
