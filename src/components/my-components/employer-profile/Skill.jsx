import { useNavigate } from "react-router-dom";

export const Skill = ({ skillName, className }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/job/search", { state: { search: skillName } })}
      className={`hover:cursor-pointer border rounded-3xl bg-background-secondary/80 px-3 py-1 m-2 ${className}`}
    >
      {skillName}
    </div>
  );
};
