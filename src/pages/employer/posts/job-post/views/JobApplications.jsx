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
  FaCheck,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaEye,
  FaFilter,
} from "react-icons/fa";
import { getJobApplicationsByPostId } from "../services/getJobApplicationsByPostId";
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

export const JobApplications = ({ postId }) => {
  const [paginatedData, setPaginatedData] = useState({
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalRecords: 0,
    hasNext: false,
    hasPrevious: false,
  });

  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef("");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchApplications = () => {
    setLoading(true);
    getJobApplicationsByPostId(
      postId,
      paginatedData.pageNumber,
      paginatedData.pageSize,
      currentSearchTerm,
      selectedStatus || null,
      (data) => {
        setPaginatedData(data);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        console.error("Error fetching applications:", error);
        showErrorToastHasTitle("Lỗi", "Không thể tải danh sách đơn ứng tuyển");
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
    fetchApplications();
  }, [
    postId,
    paginatedData.pageNumber,
    paginatedData.pageSize,
    currentSearchTerm,
    selectedStatus,
  ]);

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

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setPaginatedData((prev) => ({ ...prev, pageNumber: 1 }));
  };

  const handleUpdateApplicationStatus = async (applicationId, newStatus) => {};

  const handleViewCV = (cvLink) => {
    if (cvLink) {
      window.open(cvLink, "_blank", "noopener,noreferrer");
    } else {
      showErrorToastHasTitle("Lỗi", "Không tìm thấy CV");
    }
  };

  const handleDownloadCV = (cvLink, candidateName) => {
    if (cvLink) {
      const link = document.createElement("a");
      link.href = cvLink;
      link.download = `CV_${candidateName}.pdf`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      showErrorToastHasTitle("Lỗi", "Không tìm thấy CV");
    }
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
    setSelectedStatus("");
    searchInputRef.current.value = "";
    setPaginatedData((prev) => ({ ...prev, pageNumber: 1 }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card
          className={`border-0 shadow-sm bg-gradient-to-br from-slate-50 to-slate-100 cursor-pointer transition-all duration-200 ${
            selectedStatus === "" ? "ring-2 ring-slate-400" : "hover:shadow-md"
          }`}
          onClick={() => {
            setSelectedStatus("");
            setPaginatedData((prev) => ({ ...prev, pageNumber: 1 }));
          }}
        >
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-slate-700 mb-1">
              {statusStats.total}
            </div>
            <div className="text-sm text-slate-600 font-medium">Tổng đơn</div>
          </CardContent>
        </Card>

        <Card
          className={`border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 cursor-pointer transition-all duration-200 ${
            selectedStatus === "1" ? "ring-2 ring-blue-400" : "hover:shadow-md"
          }`}
          onClick={() => {
            setSelectedStatus("1");
            setPaginatedData((prev) => ({ ...prev, pageNumber: 1 }));
          }}
        >
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-700 mb-1">
              {statusStats[1] || 0}
            </div>
            <div className="text-sm text-blue-600 font-medium">Chờ xử lý</div>
          </CardContent>
        </Card>

        <Card
          className={`border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100 cursor-pointer transition-all duration-200 ${
            selectedStatus === "2" ? "ring-2 ring-green-400" : "hover:shadow-md"
          }`}
          onClick={() => {
            setSelectedStatus("2");
            setPaginatedData((prev) => ({ ...prev, pageNumber: 1 }));
          }}
        >
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-700 mb-1">
              {statusStats[2] || 0}
            </div>
            <div className="text-sm text-green-600 font-medium">
              Đã chấp nhận
            </div>
          </CardContent>
        </Card>

        <Card
          className={`border-0 shadow-sm bg-gradient-to-br from-red-50 to-red-100 cursor-pointer transition-all duration-200 ${
            selectedStatus === "3" ? "ring-2 ring-red-400" : "hover:shadow-md"
          }`}
          onClick={() => {
            setSelectedStatus("3");
            setPaginatedData((prev) => ({ ...prev, pageNumber: 1 }));
          }}
        >
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-700 mb-1">
              {statusStats[3] || 0}
            </div>
            <div className="text-sm text-red-600 font-medium">Đã từ chối</div>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-lg">
        <div className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Danh sách đơn ứng tuyển
            </h3>

            {(currentSearchTerm || selectedStatus) && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Đang lọc:</span>
                {selectedStatus && (
                  <Badge variant="secondary" className="text-xs">
                    {statusConfig[selectedStatus]?.label}
                  </Badge>
                )}
                {currentSearchTerm && (
                  <Badge variant="secondary" className="text-xs">
                    "{currentSearchTerm}"
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-xs h-6 px-2"
                >
                  Xóa tất cả
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-6">
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

            <div className="flex items-center gap-2">
              <FaFilter className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground/70">Trạng thái:</span>
              <select
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 min-w-[150px]"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="1">Chờ phản hồi</option>
                <option value="2">Được nhận</option>
                <option value="3">Bị từ chối</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <div className="group h-11 w-[350px] rounded-l-md border border-input shadow-sm flex items-center group-hover:border-input/70 focus-within:outline-none focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 group-hover:shadow-md transition-shadow duration-150">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên ứng viên..."
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
                  key={application.id}
                  className="p-6 hover:bg-muted/30 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-14 w-14 border-2 border-border">
                        <AvatarImage
                          src={application.candidateImage}
                          alt={application.candidateFullName}
                        />
                        <AvatarFallback className="bg-muted">
                          <FaUser className="h-6 w-6 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-2 flex-1">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground leading-tight">
                            {application.candidateFullName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <FaEnvelope className="h-3 w-3 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              {application.candidateEmail}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <FaCalendarAlt className="h-3 w-3 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Nộp đơn: {formatDate(application.createdAt)}
                            </p>
                          </div>
                        </div>

                        {application.coverLetter && (
                          <div className="mt-3">
                            <div className="bg-muted/50 p-3 rounded-lg border border-border">
                              <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                                Thư xin việc
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
                                handleDownloadCV(
                                  application.cvLink,
                                  application.candidateFullName
                                )
                              }
                              className="h-8 w-8 p-0 hover:bg-slate-100 hover:border-slate-300"
                              title="Tải CV"
                            >
                              <FaDownload className="h-3 w-3" />
                            </Button>
                          </>
                        )}

                        {application.statusJobApplication === 1 && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-green-50 hover:border-green-300 hover:text-green-700"
                              onClick={() =>
                                handleUpdateApplicationStatus(application.id, 2)
                              }
                              title="Chấp nhận"
                            >
                              <FaCheck className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                              onClick={() =>
                                handleUpdateApplicationStatus(application.id, 3)
                              }
                              title="Từ chối"
                            >
                              <FaTimes className="h-3 w-3" />
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
                {currentSearchTerm || selectedStatus
                  ? "Không tìm thấy đơn ứng tuyển nào"
                  : "Chưa có đơn ứng tuyển nào"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {currentSearchTerm || selectedStatus
                  ? "Thử thay đổi bộ lọc hoặc tìm kiếm"
                  : "Các ứng viên sẽ xuất hiện tại đây khi họ nộp đơn"}
              </p>
              {(currentSearchTerm || selectedStatus) && (
                <Button variant="outline" onClick={handleClearFilters}>
                  Xóa tất cả bộ lọc
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
};
