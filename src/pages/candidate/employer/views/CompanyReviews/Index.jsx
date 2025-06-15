import { useParams } from "react-router-dom";
import { getReviewsByUserId } from "../../services/getReviewsByUserId";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatUtils";
import { PaginationControl } from "@/components/my-components/PaginationControl";
import StarRatings from "react-star-ratings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaThumbsUp, FaThumbsDown, FaStar, FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Index() {
  const { userId } = useParams();
  const [paginatedData, setPaginatedData] = useState({
    items: [],
    pageNumber: 1,
    pageSize: 5,
    totalPages: 1,
    totalRecords: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getReviewsByUserId(
      userId,
      paginatedData.pageNumber,
      paginatedData.pageSize,
      (data) => {
        setPaginatedData(data);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching reviews:", error);
        setIsLoading(false);
      },
      (exception) => {
        console.error("Exception fetching reviews:", exception);
        setIsLoading(false);
      }
    );
  }, [userId, paginatedData.pageNumber, paginatedData.pageSize]);

  const handlePageChange = (newPage) => {
    if (isLoading) return;
    setPaginatedData((prev) => ({ ...prev, pageNumber: newPage }));
  };

  return (
    <div className="mt-6">
      {!showReviewForm && (
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-primary hover:bg-primary/90"
          >
            Viết đánh giá
          </Button>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <ReviewForm
              employerId={userId}
              onCancel={() => setShowReviewForm(false)}
              onSuccess={() => {
                setShowReviewForm(false);
                // Refresh reviews
                setPaginatedData((prev) => ({ ...prev, pageNumber: 1 }));
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <Card>
        <CardContent className="p-6">
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 mb-6 pb-6 border-b border-border last:border-b-0"
                >
                  <div className="w-12 h-12 rounded-full bg-muted animate-pulse"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-muted rounded h-4 w-32 animate-pulse"></div>
                      <div className="bg-muted rounded h-4 w-20 animate-pulse"></div>
                    </div>
                    <div className="bg-muted rounded h-6 w-48 mb-3 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="bg-muted rounded h-4 w-full animate-pulse"></div>
                      <div className="bg-muted rounded h-4 w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
          ) : paginatedData.items && paginatedData.items.length > 0 ? (
            paginatedData.items.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <FaStar className="mx-auto h-16 w-16 text-muted-foreground/30" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Chưa có đánh giá nào
              </h3>
              <p className="text-muted-foreground mb-4">
                Hãy là người đầu tiên đánh giá công ty này!
              </p>
              <Button onClick={() => setShowReviewForm(true)}>
                Viết đánh giá đầu tiên
              </Button>
            </div>
          )}

          {paginatedData.totalPages > 1 && (
            <div className="mt-6 pt-6 border-border">
              <PaginationControl
                currentPage={paginatedData.pageNumber}
                totalPages={paginatedData.totalPages}
                hasNext={paginatedData.hasNext}
                hasPrevious={paginatedData.hasPrevious}
                onPageChange={handlePageChange}
                className="mt-4 mb-5"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const ReviewItem = ({ review }) => {
  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getRatingLabel = (rating) => {
    const labels = {
      1: "Rất tệ",
      2: "Tệ",
      3: "Bình thường",
      4: "Tốt",
      5: "Rất tốt",
    };
    return labels[rating] || "";
  };

  return (
    <div className="flex items-start gap-4 mb-6 pb-6 border-b border-border last:border-b-0 last:mb-0 last:pb-0">
      <Avatar className="h-14 w-14 border-2 border-border">
        <AvatarImage src={review.senderImage} alt={review.senderFullName} />
        <AvatarFallback className="bg-muted">
          <FaUser className="h-6 w-6 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-foreground">
              {review.senderFullName}
            </span>
            <span className="text-sm text-muted-foreground">
              {formatDate(review.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {review.isRecommend ? (
              <Badge
                variant="default"
                className="bg-green-100 text-green-700 border-green-200"
              >
                <FaThumbsUp className="w-3 h-3 mr-1" />
                Khuyến khích
              </Badge>
            ) : (
              <Badge
                variant="default"
                className="bg-red-100 text-red-700 border-red-200"
              >
                <FaThumbsDown className="w-3 h-3 mr-1" />
                Không khuyến khích
              </Badge>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-3">
          <StarRatings
            rating={review.ratingType}
            starRatedColor="#FFD700"
            starEmptyColor="#E5E7EB"
            numberOfStars={5}
            starDimension="18px"
            starSpacing="2px"
            name={`rating-${review.id}`}
          />
          <span
            className={`text-sm font-medium ${getRatingColor(
              review.ratingType
            )}`}
          >
            {getRatingLabel(review.ratingType)}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-semibold text-lg mb-3 text-foreground">
          {review.title}
        </h4>

        {/* Description */}
        <div className="text-foreground/80 leading-relaxed">
          {review.description}
        </div>
      </div>
    </div>
  );
};

const ReviewForm = ({ employerId, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ratingType: 0,
    isRecommend: false,
  });

  const handleSubmit = (e) => {};

  const getRatingLabel = (rating) => {
    const labels = {
      1: "Rất tệ",
      2: "Tệ",
      3: "Bình thường",
      4: "Tốt",
      5: "Rất tốt",
    };
    return labels[rating] || "Chọn mức đánh giá";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-4">Viết đánh giá về công ty</h4>
      </div>

      <div>
        <div className="flex  gap-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Đánh giá tổng thể
          </label>
          <label className="text-destructive">*</label>
        </div>
        <div className="flex items-center gap-4">
          <StarRatings
            rating={formData.ratingType}
            starRatedColor="#FFD700"
            starEmptyColor="#E5E7EB"
            numberOfStars={5}
            starDimension="24px"
            starSpacing="4px"
            name="rating-input"
            changeRating={(newRating) =>
              setFormData((prev) => ({ ...prev, ratingType: newRating }))
            }
          />
          <span className="text-sm text-muted-foreground">
            {getRatingLabel(formData.ratingType)}
          </span>
        </div>
      </div>

      <div>
        <div className="flex  gap-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Tiêu đề đánh giá
          </label>
          <label className="text-destructive">*</label>
        </div>
        <input
          type="text"
          className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Nhập tiêu đề cho đánh giá của bạn"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>

      <div>
        <div className="flex  gap-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Nội dung đánh giá
          </label>
          <label className="text-destructive">*</label>
        </div>
        <textarea
          className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={6}
          placeholder="Chia sẻ trải nghiệm làm việc tại công ty này..."
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      {/* Recommend */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isRecommend}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isRecommend: e.target.checked,
              }))
            }
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
          <span className="text-sm font-medium text-foreground">
            Tôi khuyến khích mọi người làm việc tại công ty này
          </span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Gửi đánh giá
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
      </div>
    </form>
  );
};
