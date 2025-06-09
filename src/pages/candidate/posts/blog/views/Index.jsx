import "@/layouts/candidate/style.css";
import { SearchFilterInput } from "@/components/my-components/search-filter/SearchFilterInput";
import { getBlogPostsSummary } from "@/pages/candidate/posts/blog/services/getBlogPostsSummary";
import { useEffect, useState } from "react";
import { BlogPostSummary } from "@/pages/candidate/shared-card/BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function Index() {
  const [paginatedData, setPaginatedData] = useState({
    items: [],
    pageNumber: 1,
    pageSize: 9,
    totalPages: 1,
    totalRecords: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(true);
    getBlogPostsSummary(
      paginatedData.pageNumber,
      paginatedData.pageSize,
      searchTerm,
      (data) => {
        setPaginatedData(data);
        setIsSearching(false);
      },
      () => {
        setIsSearching(false);
      },
      () => {
        setIsSearching(false);
      }
    );
  }, [paginatedData.pageNumber, paginatedData.pageSize, searchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > paginatedData.totalPages) return;
    setPaginatedData((prev) => ({ ...prev, pageNumber: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPaginatedData((prev) => ({ ...prev, pageNumber: 1 }));
  };

  return (
    <>
      <div className="main-gradient  py-20">
        <div className="container mx-auto px-30">
          <h2 className="text-secondary-foreground text-3xl font-bold mb-8">
            ITJobs Blog - Ý tưởng phát triển sự nghiệp IT của bạn
          </h2>
          <SearchFilterInput
            placeholder="Nhập từ khóa tìm kiếm..."
            onSearch={handleSearch}
            defaultValue={searchTerm}
          ></SearchFilterInput>
        </div>
      </div>

      {/* content */}
      <div className="container mx-auto px-30  pt-15">
        {/* Search results info */}
        {searchTerm && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold">
              {isSearching
                ? "Đang tìm kiếm..."
                : `Kết quả tìm kiếm cho "${searchTerm}"`}
            </h3>
            {!isSearching && (
              <p className="text-muted-foreground mt-2">
                Tìm thấy {paginatedData.totalRecords} bài viết
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap">
          {isSearching ? (
            Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-1/3 px-4 mb-10">
                  <div className="animate-pulse">
                    <div className="bg-muted rounded-lg h-48 mb-3"></div>
                    <div className="bg-muted rounded h-6 w-3/4 mb-2"></div>
                    <div className="bg-muted rounded h-4 w-full mb-1"></div>
                    <div className="bg-muted rounded h-4 w-5/6"></div>
                  </div>
                </div>
              ))
          ) : paginatedData.items && paginatedData.items.length > 0 ? (
            paginatedData.items.map((item) => (
              <div key={item.id} className="w-1/3 px-4 mb-10">
                <BlogPostSummary
                  ratio={16 / 9}
                  blog={item}
                  lineClampShortContent="line-clamp-4"
                />
              </div>
            ))
          ) : (
            <div className="w-full py-16 text-center">
              <p className="text-lg text-muted-foreground">
                {searchTerm
                  ? "Không tìm thấy bài viết phù hợp với từ khóa tìm kiếm"
                  : "Không có bài viết nào"}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {paginatedData.totalPages > 0 && (
          <div className="mt-4 flex justify-center mb-5">
            <Pagination>
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
                        : "border border-input hover:bg-primary/10 hover:border-primary/30 transition-colors hover:text-primary cursor-pointer"
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
                        : "border border-input hover:bg-primary/10 hover:border-primary/30 transition-colors hover:text-primary cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
}
