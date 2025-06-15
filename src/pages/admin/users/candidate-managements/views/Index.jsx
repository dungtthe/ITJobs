import React, { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getCandidateSummary } from "../services/getCandidateSummary";
import { CiSearch } from "react-icons/ci";
import { FaLock, FaUnlock, FaEye } from "react-icons/fa";
import no_img_user from "@/assets/images/no_img_user.png";
import { SocialMediaLinks } from "@/components/my-components/icon/SocialMediaLinks";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Index() {
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

  const fetchData = () => {
    setLoading(true);
    getCandidateSummary(
      paginatedData.pageNumber,
      paginatedData.pageSize,
      currentSearchTerm,
      (data) => {
        setPaginatedData(data);
        setLoading(false);
      },
      (error) => {
        setLoading(true);
      },
      (exception) => {
        setLoading(true);
      }
    );
  };

  useEffect(() => {
    console.log(currentSearchTerm);
    if (searchInputRef.current) {
      searchInputRef.current.value = currentSearchTerm;
    }
    fetchData();
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
    if (newPage < 1 || newPage > paginatedData.totalPages) return;
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

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="h-[80vh] w-full" />
      </div>
    );
  }

  return (
    <>
      <div className="pt-4">
        {/* title */}
        <div className="border-b pl-4 pb-4">
          <h1 className="text-2xl">Danh sách ứng viên</h1>
        </div>

        {/* content */}
        <div className="border rounded-lg mt-6 ml-7 mr-7">
          {/* show and search */}
          <div className="flex items-center justify-between p-6">
            {/* items per page */}
            <div className="flex items-center gap-2">
              <span className="text-foreground/70">Hiển thị</span>
              <select
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                value={paginatedData.pageSize}
                onChange={handlePageSizeChange}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-foreground/70">mục trên mỗi trang</span>
            </div>

            {/* search with button */}
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

          {/* table */}
          <div className="overflow-auto px-6 pb-6">
            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr className="bg-muted/40 border-b border-t">
                  <th className="w-[6%] py-3.5 pl-6 pr-2 text-center font-medium text-xs uppercase tracking-wider text-foreground/70">
                    STT
                  </th>
                  <th className="w-[9%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Hình ảnh
                  </th>
                  <th className="w-[17%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Họ và tên
                  </th>
                  <th className="w-[25%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Email
                  </th>
                  <th className="w-[15%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Số điện thoại
                  </th>
                  <th className="w-[18%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Liên kết mạng xã hội
                  </th>
                  <th className="w-[10%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Trạng thái
                  </th>
                  <th className="w-[10%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.items && paginatedData.items.length > 0 ? (
                  paginatedData.items.map((candidate, index) => (
                    <tr
                      key={candidate.userId}
                      className="border-b hover:bg-muted/30"
                    >
                      <td className="py-4 pl-6 pr-2">
                        <div className="flex justify-center items-center">
                          <span className="h-6 w-6 rounded-full bg-muted/60 flex items-center justify-center text-xs font-semibold text-foreground/80">
                            {(paginatedData.pageNumber - 1) *
                              paginatedData.pageSize +
                              index +
                              1}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Avatar className="h-10 w-10 ">
                          <AvatarImage src={candidate.image} alt="Hình ảnh" />
                          <AvatarFallback className="bg-muted">
                            <FaUser className="h-6 w-6 text-muted-foreground" />
                          </AvatarFallback>
                        </Avatar>
                      </td>
                      <td className="py-4 px-4 text-sm overflow-hidden text-ellipsis">
                        {candidate.fullName}
                      </td>
                      <td className="py-4 px-4 text-sm overflow-hidden text-ellipsis">
                        {candidate.email}
                      </td>
                      <td className="py-4 px-4 text-sm overflow-hidden text-ellipsis">
                        {candidate.phoneNumber || "N/A"}
                      </td>
                      <td className="py-4 px-4">
                        {candidate.socialMedias &&
                        candidate.socialMedias.length > 0 ? (
                          <SocialMediaLinks
                            items={candidate.socialMedias.map((sm) => ({
                              name: sm.name,
                              url: sm.link,
                            }))}
                            className="flex gap-2"
                            classNameItem="text-foreground/70 hover:text-primary transition-colors text-lg"
                          />
                        ) : (
                          <span className="text-sm text-foreground/50">
                            Không có
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {candidate.isLock ? (
                          <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded-md font-medium">
                            Đã khóa
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-md font-medium">
                            Hoạt động
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-1.5 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors">
                            <FaEye size={16} />
                          </button>

                          {candidate.isLock ? (
                            <button className="p-1.5 bg-success/10 text-success rounded hover:bg-success/20 transition-colors">
                              <FaUnlock size={16} />
                            </button>
                          ) : (
                            <button className="p-1.5 bg-destructive/10 text-destructive rounded hover:bg-destructive/20 transition-colors">
                              <FaLock size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="py-4 text-center text-muted-foreground"
                    >
                      Không tìm thấy dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          <div className="flex items-center justify-between pb-6 px-6">
            <div className="flex items-center justify-between ml-5">
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                {`Hiển thị ${
                  paginatedData.items ? paginatedData.items.length : 0
                } / ${paginatedData.totalRecords} kết quả`}
              </div>
            </div>
            {paginatedData.totalPages > 0 && (
              <Pagination className="justify-end mr-5">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        paginatedData.hasPrevious &&
                        handlePageChange(paginatedData.pageNumber - 1)
                      }
                      className={
                        !paginatedData.hasPrevious
                          ? "opacity-50 cursor-not-allowed"
                          : "border border-input hover:bg-primary/10 hover:border-primary/30 transition-colors [&>span]:text-sm hover:text-primary cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {/* Pagination buttons */}
                  {Array.from(
                    { length: Math.min(5, paginatedData.totalPages) },
                    (_, i) => {
                      let pageToShow;
                      if (paginatedData.totalPages <= 5) {
                        pageToShow = i + 1;
                      } else if (paginatedData.pageNumber <= 3) {
                        pageToShow = i + 1;
                      } else if (
                        paginatedData.pageNumber >=
                        paginatedData.totalPages - 2
                      ) {
                        pageToShow = paginatedData.totalPages - 4 + i;
                      } else {
                        pageToShow = paginatedData.pageNumber - 2 + i;
                      }

                      return (
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => handlePageChange(pageToShow)}
                            isActive={pageToShow === paginatedData.pageNumber}
                            className={
                              pageToShow === paginatedData.pageNumber
                                ? "bg-primary text-primary-foreground hover:bg-primary/90 border-none"
                                : "border border-input hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors cursor-pointer"
                            }
                          >
                            {pageToShow}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                  )}

                  {paginatedData.totalPages > 5 &&
                    paginatedData.pageNumber < paginatedData.totalPages - 2 && (
                      <PaginationItem className="flex pb-2">
                        <PaginationEllipsis className="text-foreground/70 items-end" />
                      </PaginationItem>
                    )}

                  {paginatedData.totalPages > 5 &&
                    paginatedData.pageNumber < paginatedData.totalPages - 1 && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() =>
                            handlePageChange(paginatedData.totalPages)
                          }
                          className="border border-input hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors cursor-pointer"
                        >
                          {paginatedData.totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        paginatedData.hasNext &&
                        handlePageChange(paginatedData.pageNumber + 1)
                      }
                      className={
                        !paginatedData.hasNext
                          ? "opacity-50 cursor-not-allowed"
                          : "border border-input hover:bg-primary/10 hover:border-primary/30 transition-colors [&>span]:text-sm hover:text-primary cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
