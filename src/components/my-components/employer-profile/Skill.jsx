export const Skill = ({ skillName, className }) => {
  return (
    <div
      className={`border rounded-3xl bg-background-secondary/80 px-3 py-1 m-2 ${className}`}
    >
      {skillName}
    </div>
  );
};
