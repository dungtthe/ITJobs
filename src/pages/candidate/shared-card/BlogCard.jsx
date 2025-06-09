import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FaArrowRight } from "react-icons/fa";
export const BlogPostSummary = ({
  blog,
  ratio,
  lineClampTitle = "line-clamp-2",
  lineClampShortContent,
}) => {
  const handleClick = (postId) => {
    alert(postId);
  };

  return (
    <div
      onClick={() => handleClick(blog.id)}
      className="hover:cursor-pointer bg-card rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg border "
    >
      <div className="h-48 overflow-hidden relative">
        <AspectRatio ratio={ratio} className="bg-muted">
          <img
            src={blog.mainImage}
            alt={blog.title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </div>

      <div className="p-4">
        <h4 className={`text-lg font-bold ${lineClampTitle}`}>{blog.title}</h4>
        <p className={`mt-5 text-card-foreground/80 ${lineClampShortContent}`}>
          {blog.shortContent}
        </p>
      </div>

      <div className="flex items-center text-primary justify-end p-4">
        <span className="font-medium text-sm">Bắt đầu đọc</span>
        <FaArrowRight className="ml-2 size-3" />
      </div>
    </div>
  );
};
