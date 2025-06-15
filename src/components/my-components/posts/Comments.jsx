import { getComments } from "@/shared-services/posts/getComments";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatUtils";
import { Reactions } from "../Reactions";
import { PaginationControl } from "../PaginationControl";
import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const Comments = ({ postId }) => {
  const [paginatedData, setPaginatedData] = useState({
    items: [],
    pageNumber: 1,
    pageSize: 5,
    totalPages: 1,
    totalRecords: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [replyingId, setReplyingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getComments(
      postId,
      paginatedData.pageNumber,
      paginatedData.pageSize,
      (data) => {
        setPaginatedData(data);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
      },
      (exception) => {
        setIsLoading(false);
      }
    );
  }, [postId, paginatedData.pageNumber, paginatedData.pageSize]);

  const handlePageChange = (newPage) => {
    setPaginatedData((prev) => ({ ...prev, pageNumber: newPage }));
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">
        Bình luận ({paginatedData.totalRecords})
      </h3>
      <div className="bg-card p-7 rounded-lg border">
        <CommentForm postId={postId} />
        <div className="mt-5">
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-muted animate-pulse"></div>
                  <div className="flex-1">
                    <div className="bg-muted rounded-xl px-4 py-2 animate-pulse">
                      <div className="bg-muted-foreground/20 rounded h-4 w-1/3 mb-2"></div>
                      <div className="bg-muted-foreground/20 rounded h-4 w-full mb-1"></div>
                      <div className="bg-muted-foreground/20 rounded h-4 w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))
          ) : paginatedData.items && paginatedData.items.length > 0 ? (
            paginatedData.items.map((comment) => (
              <CommentItem
                key={comment.id}
                item={comment}
                replyingId={replyingId}
                setReplyingId={setReplyingId}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
              </p>
            </div>
          )}
        </div>

        <PaginationControl
          currentPage={paginatedData.pageNumber}
          totalPages={paginatedData.totalPages}
          hasNext={paginatedData.hasNext}
          hasPrevious={paginatedData.hasPrevious}
          onPageChange={handlePageChange}
          className="mt-4 mb-5"
        />
      </div>
    </div>
  );
};

const CommentItem = ({
  item,
  level = 0,
  handleReact,
  replyingId,
  setReplyingId,
}) => {
  const [showSub, setShowSub] = useState(false);

  const hasSub = item.subComments && item.subComments.length > 0;

  return (
    <div
      className={`
        flex items-start gap-3 mb-4
        ${level > 0 ? "ml-6 border-l-2 pl-4 border-border/60" : ""}
      `}
    >
      <Avatar className="h-14 w-14 border-2 border-border">
        <AvatarImage src={item.senderImage} alt={item.senderFullName} />
        <AvatarFallback className="bg-muted">
          <FaUser className="h-6 w-6 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div
          className="
            bg-card text-card-foreground rounded-xl px-4 py-2 shadow-sm
            border border-border/60
          "
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-primary">
              {item.senderFullName}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDate(item.createdAt)}
            </span>
          </div>
          <div>{item.content}</div>
        </div>

        <div className="flex items-center gap-3 mt-1">
          <Reactions
            reactions={item.reactions || []}
            handleReact={(type) => handleReact?.(item.id, type)}
            clasNameIcon="text-base"
            classNameCount="text-xs ml-1"
          />
          <button
            className="text-xs text-primary hover:underline font-medium transition"
            onClick={() => setReplyingId(item.id)}
            type="button"
          >
            Trả lời
          </button>
        </div>

        {/* Form trả lời */}
        {replyingId === item.id && (
          <CommentReplyForm
            commentId={item.id}
            onCancel={() => setReplyingId(null)}
          />
        )}

        {hasSub && (
          <button
            onClick={() => setShowSub((v) => !v)}
            className="text-xs mt-2 ml-1 text-primary hover:underline font-medium transition"
            type="button"
          >
            {showSub
              ? `Ẩn phần trả lời (${item.subComments.length})`
              : `Hiển thị phần trả lời (${item.subComments.length})`}
          </button>
        )}
        {hasSub && showSub && (
          <div className="mt-2">
            {item.subComments.map((sub) => (
              <CommentItem
                key={sub.id}
                item={sub}
                level={level + 1}
                handleReact={handleReact}
                replyingId={replyingId}
                setReplyingId={setReplyingId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    console.log("Bình luận bài đăng:", { postId, content });
    setContent("");
  };

  const handleCancel = () => {
    setContent("");
  };

  return (
    <form className="mb-5 flex gap-2 items-start" onSubmit={handleSubmit}>
      <textarea
        className="flex-1 px-4 py-2 border rounded-lg bg-background resize-none focus:outline-primary text-base min-h-30"
        rows={2}
        placeholder="Viết bình luận..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="bg-primary text-primary-foreground rounded-lg px-4 py-2 font-semibold hover:opacity-90 transition"
          disabled={!content.trim()}
        >
          Gửi
        </button>
        {content.trim() && (
          <button
            type="button"
            className="bg-muted text-muted-foreground rounded-lg px-4 py-2 font-semibold hover:opacity-80 transition"
            onClick={handleCancel}
          >
            Hủy
          </button>
        )}
      </div>
    </form>
  );
};

const CommentReplyForm = ({ commentId, onCancel }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    console.log("Trả lời bình luận:", { commentId, content });
    setContent("");
    onCancel && onCancel();
  };

  return (
    <form className="flex gap-2 items-start mt-2" onSubmit={handleSubmit}>
      <textarea
        className="flex-1 px-4 py-2 border rounded-lg bg-background resize-none focus:outline-primary text-base"
        rows={2}
        placeholder="Viết trả lời..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="bg-primary text-primary-foreground rounded-lg px-3 py-2 font-semibold hover:opacity-90 transition"
        disabled={!content.trim()}
      >
        Trả lời
      </button>
      {onCancel && (
        <button
          type="button"
          className="bg-muted text-muted-foreground rounded-lg px-3 py-2 font-semibold ml-1"
          onClick={onCancel}
        >
          Hủy
        </button>
      )}
    </form>
  );
};
