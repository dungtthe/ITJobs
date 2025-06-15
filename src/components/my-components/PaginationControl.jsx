import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const PaginationControl = ({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
  className = "",
  showEllipsis = true,
  maxVisiblePages = 5,
}) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={i === currentPage}
              className={
                i === currentPage
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 border-none"
                  : "border border-input hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors cursor-pointer"
              }
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      return pages;
    }

    const maxPages = Math.min(maxVisiblePages, totalPages);

    for (let i = 0; i < maxPages; i++) {
      let pageToShow;

      if (currentPage <= 3) {
        pageToShow = i + 1;
      } else if (currentPage >= totalPages - 2) {
        pageToShow = totalPages - maxVisiblePages + 1 + i;
      } else {
        pageToShow = currentPage - 2 + i;
      }

      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(pageToShow)}
            isActive={pageToShow === currentPage}
            className={
              pageToShow === currentPage
                ? "bg-primary text-primary-foreground hover:bg-primary/90 border-none"
                : "border border-input hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors cursor-pointer"
            }
          >
            {pageToShow}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  const shouldShowEllipsis = () => {
    return (
      showEllipsis &&
      totalPages > maxVisiblePages + 1 &&
      currentPage < totalPages - 2
    );
  };

  const shouldShowLastPage = () => {
    if (!shouldShowEllipsis()) return false;

    const lastVisiblePage =
      currentPage <= 3
        ? maxVisiblePages
        : currentPage >= totalPages - 2
        ? totalPages
        : currentPage + 2;

    return lastVisiblePage < totalPages;
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => hasPrevious && handlePageChange(currentPage - 1)}
              className={
                !hasPrevious
                  ? "opacity-50 cursor-not-allowed"
                  : "border border-input hover:bg-primary/10 hover:border-primary/30 transition-colors hover:text-primary cursor-pointer"
              }
            />
          </PaginationItem>

          {renderPageNumbers()}

          {shouldShowEllipsis() && (
            <PaginationItem className="flex pb-2">
              <PaginationEllipsis className="text-foreground/70 items-end" />
            </PaginationItem>
          )}

          {shouldShowLastPage() && (
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(totalPages)}
                className="border border-input hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors cursor-pointer"
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => hasNext && handlePageChange(currentPage + 1)}
              className={
                !hasNext
                  ? "opacity-50 cursor-not-allowed"
                  : "border border-input hover:bg-primary/10 hover:border-primary/30 transition-colors hover:text-primary cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
