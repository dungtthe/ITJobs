import React, { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { IconAdd } from "@/components/my-components/icon/IconAdd";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import no_img_user from "@/assets/images/no_img_user.png";
import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getBlogPostsSummary } from "../services/getBlogPostsSummary";
import { formatDate } from "@/utils/formatUtils.js";
import { IconEye } from "@/components/my-components/icon/IconEye";
import { CompanyFilterCombobox } from "@/components/my-components/posts/CompanyFilterCombobox";
import { getCompanyNames } from "@/pages/admin/share-services/getCompanyNames.js";
export default function Index() {
  const navigate = useNavigate();
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
  const [companies, setCompanies] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const searchInputRef = useRef("");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  const fetchCompanies = () => {
    getCompanyNames(
      (data) => {
        setCompanies(data);
      },
      // onFail
      (error) => {},
      // onException
      (exception) => {}
    );
  };
  useEffect(() => {
    fetchCompanies();
  }, []);
  const fetchData = () => {
    setLoading(true);
    getBlogPostsSummary(
      paginatedData.pageNumber,
      paginatedData.pageSize,
      currentSearchTerm,
      selectedUserId,
      (data) => {
        setPaginatedData(data);
        setLoading(false);
      },
      (error) => {
        setLoading(true);
      },
      // onException
      (exception) => {
        setLoading(true);
      }
    );
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.value = currentSearchTerm;
    }
    fetchData();
  }, [
    paginatedData.pageNumber,
    paginatedData.pageSize,
    currentSearchTerm,
    selectedUserId,
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
  const handleCompanyChange = (userId) => {
    setSelectedUserId(userId);
    setPaginatedData((prev) => ({ ...prev, pageNumber: 1 }));
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

  const handleAddPost = () => {
    navigate("/admin/blog-post/add");
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
      <div className="pt-4 bg-background rounded-xl border pb-10">
        {/* title */}
        <div className="border-b pl-4 pb-4 flex gap-2">
          <h1 className="text-2xl">Danh sách bài đăng tin tức</h1>
          <IconAdd onClick={handleAddPost}></IconAdd>
        </div>

        {/* content */}
        <div className="border rounded-lg mt-6 ml-7 mr-7">
          {/* show and search */}
          <div className="flex items-center justify-between p-6">
            {/* số lượng show */}
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

            <div className="flex items-cente">
              {/* cbo company-names */}
              <div className="mr-5 w-[250px]">
                {companies.length > 0 && (
                  <CompanyFilterCombobox
                    companies={companies}
                    onChange={handleCompanyChange}
                    selectedUserId={selectedUserId}
                  />
                )}
              </div>
              {/* search with button */}
              <div className="flex items-center">
                <div className="group h-11 w-[350px] rounded-l-md border border-input shadow-sm flex items-center group-hover:border-input/70 focus-within:outline-none focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 group-hover:shadow-md transition-shadow duration-150">
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên công ty, tiêu đề..."
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

          {/* table */}
          <div className="overflow-auto px-6 pb-6">
            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr className="bg-muted/40 border-b border-t">
                  <th className="w-[4%] py-3.5 pl-6 pr-2 text-center font-medium text-xs uppercase tracking-wider text-foreground/70">
                    STT
                  </th>
                  <th className="w-[10%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Hình ảnh
                  </th>
                  <th className="w-[15%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Tiêu đề
                  </th>
                  <th className="w-[20%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Mô tả ngắn
                  </th>
                  <th className="w-[7%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Lượt xem
                  </th>
                  <th className="w-[10%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Tác giả
                  </th>
                  <th className="w-[13%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Thời gian tạo
                  </th>
                  <th className="w-[13%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Thời gian chỉnh sửa
                  </th>
                  <th className="w-[8%] py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.items && paginatedData.items.length > 0 ? (
                  paginatedData.items.map((post, index) => (
                    <tr key={post.id} className="border-b hover:bg-muted/30">
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
                        <div className="h-16 w-24 rounded overflow-hidden">
                          {!post.mainImage || post.mainImage === "d" ? (
                            <div className="h-full w-full bg-muted/60 flex items-center justify-center">
                              <span className="text-xs text-foreground/60">
                                Không có ảnh
                              </span>
                            </div>
                          ) : (
                            <img
                              src={post.mainImage}
                              alt="Blog post"
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium line-clamp-4">
                        {post.title}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm line-clamp-4 text-foreground/80">
                          {post.shortContent}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-center">
                        {post.viewCount}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-10 w-10 ">
                            <AvatarImage
                              src={post.authorAvatar}
                              alt="Hình ảnh"
                            />
                            <AvatarFallback className="bg-muted">
                              <FaUser className="h-6 w-6 text-muted-foreground" />
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium ml-1">
                            {post.authorName}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground/70">
                        {formatDate(post.createAt)}
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground/70">
                        {post.updateAt === post.createAt
                          ? "Chưa từng chỉnh sửa"
                          : formatDate(post.updateAt)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2 justify-center">
                          <IconEye></IconEye>
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
