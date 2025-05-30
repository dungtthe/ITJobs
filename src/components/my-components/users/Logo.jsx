export default function Logo({
  as = "div",
  size = "medium",
  className = "",
  itColor = "text-secondary-foreground",
  jobsColor = "text-secondary-foreground",
  bgColor = "bg-primary",
  ...props
}) {
  const sizeClasses = {
    xsmall: {
      container: "w-5 h-6",
      text: "text-xl",
      textSecond: "text-xl",
    },
    small: {
      container: "w-6 h-8",
      text: "text-2xl",
      textSecond: "text-2xl",
    },
    medium: {
      container: "w-8 h-10",
      text: "text-3xl",
      textSecond: "text-3xl",
    },
    large: {
      container: "w-11 h-14",
      text: "text-5xl",
      textSecond: "text-5xl",
    },
  };

  const currentSize = sizeClasses[size];
  const Component = as;

  return (
    <Component
      className={`flex items-center justify-start hover:cursor-pointer ${className}`}
      {...props}
    >
      <div className="flex items-center">
        <span className="relative inline-block">
          <div
            className={`${bgColor} ${currentSize.container} rounded-full transform rotate-14 flex items-center justify-center`}
          >
            <span
              className={`${itColor} ${currentSize.text} font-bold transform -rotate-14`}
            >
              it
            </span>
          </div>
        </span>
        <span
          className={`ml-1 font-bold ${jobsColor} ${currentSize.textSecond}`}
        >
          Jobs
        </span>
      </div>
    </Component>
  );
}
