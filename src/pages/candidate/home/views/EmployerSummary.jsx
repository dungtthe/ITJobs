import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const EmployerSummary = ({ employer, ratio }) => {
  const navigate = useNavigate();

  const handleClick = (userId) => {
    navigate(`/company/${userId}`);
  };

  const locationName = employer.locationNames.map((item) => item).join(", ");
  const totalOpenJobs =
    employer.totalOpenJobs === 0
      ? "Xem công ty"
      : employer.totalOpenJobs + " việc làm đang tuyển";

  return (
    <div
      onClick={() => handleClick(employer.userId)}
      className="hover:cursor-pointer bg-card rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg border "
    >
      <div className="h-48 overflow-hidden relative">
        <AspectRatio ratio={ratio} className="bg-muted">
          <img
            src={employer.image}
            alt={employer.companyName}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </div>

      <div className="p-4">
        <h5 className="font-bold text-lg mb-2 line-clamp-1 text-center">
          {employer.companyName}
        </h5>

        <div className="flex items-center text-card-foreground mt-4">
          <FaMapMarkerAlt className="mr-2 text-primary size-4" />
          <span className="text-sm line-clamp-1">{locationName}</span>
        </div>

        <div className="flex items-center text-primary mt-2">
          <FaBriefcase className="mr-2 size-4" />
          <span className="text-sm font-medium">{totalOpenJobs}</span>
        </div>
      </div>
    </div>
  );
};
