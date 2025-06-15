import React, { useEffect, useState, useRef } from "react";
import { getBlogPostById } from "../services/getBlogPostById";
import { useParams } from "react-router-dom";
import { sanitizeHtml } from "@/utils/sanitizeHtmlUtils";
import { formatDate } from "@/utils/formatUtils";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import no_img_user from "@/assets/images/no_img_user.png";
import { getRandomBlogPostsSummary } from "../services/getRandomBlogPostsSummary";
import { BlogPostSummary } from "@/pages/candidate/shared-card/BlogCard";
import { Comments } from "@/components/my-components/posts/Comments";
import { Reactions } from "@/components/my-components/Reactions";
export default function Detail() {
  const { id } = useParams();

  const [blogPost, setBlogPost] = useState(null);
  const [processedContent, setProcessedContent] = useState("");
  const avatartLink = useRef(null);

  const [blogPostsRandom, setBlogPostsRandom] = useState(null);
  useEffect(() => {
    getBlogPostById(
      id,
      (data) => {
        console.log("reaction: ", data.reactions);
        setBlogPost(data);
        if (data && data.content) {
          const sanitizedContent = sanitizeHtml(data.content);
          setProcessedContent(sanitizedContent);
        }
        if (data.authorAvatar) {
          if (data.authorAvatar === "no_img_user.png") {
            avatartLink.current = no_img_user;
          } else {
            avatartLink.current = data.authorAvatar;
          }
        }
      },
      (error) => {},
      (exception) => {}
    );

    getRandomBlogPostsSummary(id, 5, (data) => {
      setBlogPostsRandom(data);
    });
  }, [id]);

  return (
    <>
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex justify-between">
          {/*detail post  */}
          <div className="w-[70%] bg-background-secondary border rounded-lg">
            {blogPost === null ? (
              <>
                <Skeleton className="h-screen bg-accent/5"></Skeleton>
              </>
            ) : (
              <>
                <div className="mt-6 px-10 flex justify-between">
                  <div>
                    <p className="text-foreground/70 text-lg italic">
                      Ngày đăng: {formatDate(blogPost?.createAt)}
                    </p>
                    {blogPost?.createAt === blogPost?.updateAt ? (
                      <></>
                    ) : (
                      <>
                        <p className="text-foreground/70 text-lg italic">
                          Lần chỉnh sửa cuối: {formatDate(blogPost?.updateAt)}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="mr-10 flex items-center gap-2">
                    <span className="font-medium">Tác giả: </span>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-11">
                        <AvatarImage src={avatartLink.current} />
                      </Avatar>
                      <span>{blogPost?.authorName}</span>
                    </div>
                  </div>
                </div>
                {/* content */}
                <div
                  className="mt-5 tinymce-content px-10 pb-10"
                  dangerouslySetInnerHTML={{
                    __html: processedContent,
                  }}
                />

                {/* Reactions */}
                <div className="mt-5 px-2 border-t py-3">
                  <Reactions reactions={blogPost.reactions} />
                </div>
              </>
            )}
          </div>
          {/* co the ban thich */}
          <div className="w-[28%]">
            <div className="border rounded-lg sticky top-18">
              {blogPostsRandom === null ? (
                <>
                  <Skeleton className="h-96 bg-accent/5"></Skeleton>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="text-2xl font-medium text-foreground px-5 pt-5">
                      Có thể bạn sẽ thích
                    </h4>
                    <div className="mt-5 overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
                      {blogPostsRandom && blogPostsRandom.length > 0 ? (
                        blogPostsRandom.map((item) => (
                          <div key={item.id} className="px-4 mb-6">
                            <BlogPostSummary
                              ratio={3 / 2}
                              blog={item}
                              lineClampShortContent="line-clamp-3"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground px-5 py-3">
                          Không có bài viết gợi ý nào
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* comment */}
        <div className="mt-10">
          <Comments postId={id}></Comments>
        </div>
      </div>
    </>
  );
}
