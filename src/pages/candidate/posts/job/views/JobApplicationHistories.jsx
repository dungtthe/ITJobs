import React, { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/utils/formatUtils";
import { PaginationControl } from "@/components/my-components/PaginationControl";
import { CiSearch } from "react-icons/ci";
import {
  FaDownload,
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaEye,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { getJobApplicationHistories } from "../services/getJobApplicationHistories";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/MyToast";

const statusConfig = {
  1: {
    label: "Chờ phản hồi",
    variant: "default",
    className: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    icon: "📝",
  },
  2: {
    label: "Được nhận",
    variant: "default",
    className: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
    icon: "✅",
  },
  3: {
    label: "Bị từ chối",
    variant: "default",
    className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
    icon: "❌",
  },
};

export default function JobApplicationHistories() {
  const [paginatedData, setPaginatedData] = useState({
    items: [],
    pageNumber: 1,
    pageSize: 5,
    totalPages: 1,
    totalRecords: 0,
    hasNext: false,
    hasPrevious: false,
  });

  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef("");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  const fetchApplicationHistory = () => {
    setLoading(true);
    getJobApplicationHistories(
      paginatedData.pageNumber,
      paginatedData.pageSize,
      currentSearchTerm,
      (data) => {
        setPaginatedData(data);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        console.error("Error fetching application history:", error);
        showErrorToastHasTitle("Lỗi", "Không thể tải lịch sử ứng tuyển");
      },
      (exception) => {
        setLoading(false);
        console.error("Exception:", exception);
        showErrorToastHasTitle("Lỗi", "Đã có lỗi xảy ra");
      }
    );
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.value = currentSearchTerm;
    }
    fetchApplicationHistory();
  }, [paginatedData.pageNumber, paginatedData.pageSize, currentSearchTerm]);

  const handleSearch = () => {
    setCurrentSearchTerm(searchInputRef.current.value);
    setPaginatedData((prev) => ({ ...prev, pageNumber: 1 }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePageChange = (newPage) => {
    setPaginatedData((prev) => ({ ...prev, pageNumber: newPage }));
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPaginatedData((prev) => ({
      ...prev,
      pageSize: newSize,
      pageNumber: 1,
    }));
  };

  const handleViewCV = (cvLink) => {
    if (cvLink) {
      window.open(cvLink, "_blank", "noopener,noreferrer");
    } else {
      showErrorToastHasTitle("Lỗi", "Không tìm thấy CV");
    }
  };

  const handleDownloadCV = (cvLink) => {
    if (cvLink) {
      const link = document.createElement("a");
      link.href = cvLink;
      link.download = `CV_${Date.now()}.pdf`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      showErrorToastHasTitle("Lỗi", "Không tìm thấy CV");
    }
  };

  const handleViewJobPost = (postId) => {
    window.open(`/job/${postId}`, "_blank", "noopener,noreferrer");
  };

  const getStatusStats = () => {
    const stats = { 1: 0, 2: 0, 3: 0, total: paginatedData.totalRecords };
    paginatedData.items?.forEach((app) => {
      stats[app.statusJobApplication] =
        (stats[app.statusJobApplication] || 0) + 1;
    });
    return stats;
  };

  const statusStats = getStatusStats();

  const handleClearFilters = () => {
    setCurrentSearchTerm("");
    searchInputRef.current.value = "";
    setPaginatedData((prev) => ({ ...prev, pageNumber: 1 }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </Card>
            ))}
        </div>

        <div className="border rounded-lg">
          <div className="p-6">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="p-6">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-48 mb-2" />
                        <Skeleton className="h-4 w-64 mb-1" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 ">
      <div className="border rounded-lg  mt-10">
        <div className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Lịch sử ứng tuyển
            </h3>

            {currentSearchTerm && (
              <div className="flex items-center gap-2 ">
                <span className="text-sm text-muted-foreground">Đang tìm:</span>
                <Badge variant="secondary" className="text-xs">
                  "{currentSearchTerm}"
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-xs h-6 px-2"
                >
                  Xóa
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-6 bg-card">
          <div className="flex items-center gap-2">
            <span className="text-foreground/70">Hiển thị</span>
            <select
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              value={paginatedData.pageSize}
              onChange={handlePageSizeChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span className="text-foreground/70">mục trên mỗi trang</span>
          </div>

          <div className="flex items-center">
            <div className="group h-11 w-[350px] rounded-l-md border border-input shadow-sm flex items-center group-hover:border-input/70 focus-within:outline-none focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 group-hover:shadow-md transition-shadow duration-150">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                ref={searchInputRef}
                defaultValue={currentSearchTerm}
                onKeyDown={handleKeyPress}
                className="h-full w-full border-none rounded-none ml-3 mr-3 focus:outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              className="h-11 px-4 bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90 transition-colors flex items-center justify-center hover:cursor-pointer"
            >
              <CiSearch size={24} />
            </button>
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          {paginatedData.items && paginatedData.items.length > 0 ? (
            <div className="divide-y divide-border">
              {paginatedData.items.map((application) => (
                <div
                  key={application.jobApplicationId}
                  className="p-6 hover:bg-muted/30 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-14 w-14 border-2 border-border">
                        <AvatarImage
                          src={application.employerImage}
                          alt={application.companyName}
                        />
                        <AvatarFallback className="bg-muted">
                          <FaBuilding className="h-6 w-6 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-2 flex-1">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground leading-tight">
                            {application.postTitle}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <FaBuilding className="h-3 w-3 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              {application.companyName}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <FaCalendarAlt className="h-3 w-3 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Ngày ứng tuyển:{" "}
                              {formatDate(application.createdAt)}
                            </p>
                          </div>
                        </div>

                        {application.coverLetter && (
                          <div className="mt-3">
                            <div className="bg-muted/50 p-3 rounded-lg border border-border">
                              <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                                Thư xin việc của bạn
                              </p>
                              <p className="text-sm line-clamp-2 text-foreground">
                                {application.coverLetter}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Badge
                        variant={
                          statusConfig[application.statusJobApplication]
                            ?.variant
                        }
                        className={`${
                          statusConfig[application.statusJobApplication]
                            ?.className
                        } font-medium px-3 py-1`}
                      >
                        <span className="mr-1">
                          {statusConfig[application.statusJobApplication]?.icon}
                        </span>
                        {statusConfig[application.statusJobApplication]?.label}
                      </Badge>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewJobPost(application.postId)}
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                          title="Xem tin tuyển dụng"
                        >
                          <FaExternalLinkAlt className="h-3 w-3" />
                        </Button>

                        {application.cvLink && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewCV(application.cvLink)}
                              className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                              title="Xem CV"
                            >
                              <FaEye className="h-3 w-3" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadCV(application.cvLink)
                              }
                              className="h-8 w-8 p-0 hover:bg-slate-100 hover:border-slate-300"
                              title="Tải CV"
                            >
                              <FaDownload className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {currentSearchTerm
                  ? "Không tìm thấy đơn ứng tuyển nào"
                  : "Bạn chưa ứng tuyển công việc nào"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {currentSearchTerm
                  ? "Thử thay đổi từ khóa tìm kiếm"
                  : "Các đơn ứng tuyển của bạn sẽ xuất hiện tại đây"}
              </p>
              {currentSearchTerm && (
                <Button variant="outline" onClick={handleClearFilters}>
                  Xóa tìm kiếm
                </Button>
              )}
            </div>
          )}
        </CardContent>

        {paginatedData.totalPages > 1 && (
          <div className="border-t border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Hiển thị{" "}
                <span className="font-medium">
                  {paginatedData.items?.length || 0}
                </span>{" "}
                trong tổng số{" "}
                <span className="font-medium">
                  {paginatedData.totalRecords}
                </span>{" "}
                kết quả
              </div>
              <PaginationControl
                currentPage={paginatedData.pageNumber}
                totalPages={paginatedData.totalPages}
                hasNext={paginatedData.hasNext}
                hasPrevious={paginatedData.hasPrevious}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
