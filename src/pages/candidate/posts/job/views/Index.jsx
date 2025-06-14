import React, { useState, useEffect, useRef } from "react";
import "@/layouts/candidate/style.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchFilter } from "@/components/my-components/search-filter/SearchFilter";
import { Search, Filter, X } from "lucide-react";
import { getActiveJobPostsSummaryBySearchFilters } from "../services/getActiveJobPostsSummaryBySearchFilters";
import { JobPostSummaryCard } from "@/pages/candidate/shared-card/JobPostSummaryCard";
import { getSearchFilters } from "@/shared-services/search-filters/getSearchFilters.js";

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

  const selectedRangeFiltersRef = useRef({});
  const selectedCheckboxFiltersRef = useRef({});
  const selectedComboboxFiltersRef = useRef({});

  const [initialRangeFilters, setInitialRangeFilters] = useState({});
  const [initialCheckboxFilters, setInitialCheckboxFilters] = useState({});
  const [initialComboboxFilters, setInitialComboboxFilters] = useState({});

  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [keyRenderFilter, setKeyRenderFilter] = useState(0);

  const [searchFiltersMetadata, setSearchFiltersMetadata] = useState({
    ranges: [],
    checkboxs: [],
    comboboxs: [],
  });

  useEffect(() => {
    getSearchFilters((data) => {
      setSearchFiltersMetadata({
        ranges: data.searchFilterRanges || [],
        checkboxs: data.searchFilterCheckBoxs || [],
        comboboxs: data.searchFilterComboboxs || [],
      });
    });
  }, []);

  const handleRangeFilterChange = (id, range) => {
    selectedRangeFiltersRef.current[id] = range;
    setInitialRangeFilters((prev) => ({
      ...prev,
      [id]: range,
    }));
    updateFilterCount();
  };

  const handleCheckboxFilterChange = (id, selectedItems) => {
    const values = selectedItems.map((item) => item.value);
    selectedCheckboxFiltersRef.current[id] = values;
    setInitialCheckboxFilters((prev) => ({
      ...prev,
      [id]: values,
    }));
    updateFilterCount();
  };

  const handleComboboxFilterChange = (id, value) => {
    selectedComboboxFiltersRef.current[id] = value;
    setInitialComboboxFilters((prev) => ({
      ...prev,
      [id]: value,
    }));
    updateFilterCount();
  };

  const updateFilterCount = () => {
    const rangeFilterCount = Object.values(
      selectedRangeFiltersRef.current
    ).filter(
      (range) => range && range.min !== undefined && range.max !== undefined
    ).length;

    const checkboxFilterCount = Object.values(
      selectedCheckboxFiltersRef.current
    ).filter(
      (values) => values && Array.isArray(values) && values.length > 0
    ).length;

    const comboboxFilterCount = Object.values(
      selectedComboboxFiltersRef.current
    ).filter((value) => value && value.toString().trim() !== "").length;

    setActiveFilterCount(
      rangeFilterCount + checkboxFilterCount + comboboxFilterCount
    );
  };

  const clearAllFilters = () => {
    selectedRangeFiltersRef.current = {};
    selectedCheckboxFiltersRef.current = {};
    selectedComboboxFiltersRef.current = {};
    setInitialRangeFilters({});
    setInitialCheckboxFilters({});
    setInitialComboboxFilters({});
    setActiveFilterCount(0);
    setKeyRenderFilter((prev) => prev + 1);
    // Reset về trang 1 và fetch data
    setPaginatedData((prev) => ({ ...prev, pageNumber: 1 }));
    setTimeout(() => fetchJobPosts(), 100);
  };

  const buildSearchFilters = () => {
    const searchFilterRanges = Object.entries(selectedRangeFiltersRef.current)
      .filter(([id, range]) => {
        if (!range || range.min === undefined || range.max === undefined) {
          return false;
        }

        const filterId = parseInt(id);
        const filterMetadata = searchFiltersMetadata.ranges.find(
          (filter) => filter.id === filterId
        );

        if (!filterMetadata) return true;

        const isDefaultRange =
          range.min === filterMetadata.min && range.max === filterMetadata.max;
        if (isDefaultRange) return false;

        return range.min <= range.max;
      })
      .map(([id, range]) => ({
        searchFilterId: id,
        min: range.min,
        max: range.max,
      }));

    const searchFilterCheckBoxs = Object.entries(
      selectedCheckboxFiltersRef.current
    )
      .filter(
        ([_, values]) => values && Array.isArray(values) && values.length > 0
      )
      .map(([id, values]) => ({
        searchFilterId: id,
        values: values,
      }));

    const searchFilterComboboxs = Object.entries(
      selectedComboboxFiltersRef.current
    )
      .filter(([_, value]) => value && value.toString().trim() !== "")
      .map(([id, value]) => ({
        searchFilterId: id,
        value: value,
      }));

    return {
      pageNumber: paginatedData.pageNumber,
      pageSize: paginatedData.pageSize,
      searchTerm: searchTerm.trim(),
      searchFilterRanges,
      searchFilterCheckBoxs,
      searchFilterComboboxs,
    };
  };

  const fetchJobPosts = async () => {
    setIsSearching(true);

    try {
      const filters = buildSearchFilters();
      console.log("Sending filters to API:", filters); // Debug log

      await getActiveJobPostsSummaryBySearchFilters(
        filters,
        (response) => {
          console.log("API Response:", response); // Debug log
          setPaginatedData({
            items: response.items || [],
            pageNumber: response.pageNumber || 1,
            pageSize: response.pageSize || 9,
            totalPages: response.totalPages || 1,
            totalRecords: response.totalRecords || 0,
            hasNext: response.hasNext || false,
            hasPrevious: response.hasPrevious || false,
          });
          setIsSearching(false);
        },
        (error) => {
          console.error("API Error:", error);
          setPaginatedData({
            items: [],
            pageNumber: 1,
            pageSize: 9,
            totalPages: 1,
            totalRecords: 0,
            hasNext: false,
            hasPrevious: false,
          });
          setIsSearching(false);
        },
        (exception) => {
          console.error("API Exception:", exception);
          setPaginatedData({
            items: [],
            pageNumber: 1,
            pageSize: 9,
            totalPages: 1,
            totalRecords: 0,
            hasNext: false,
            hasPrevious: false,
          });
          setIsSearching(false);
        }
      );
    } catch (error) {
      console.error("Search error:", error);
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    setIsFilterDialogOpen(false);
    setPaginatedData((prev) => ({ ...prev, pageNumber: 1 }));
    setTimeout(() => fetchJobPosts(), 100);
  };

  const handleDialogCancel = () => {
    setIsFilterDialogOpen(false);
  };

  const handlePageChange = (newPage) => {
    setPaginatedData((prev) => ({
      ...prev,
      pageNumber: newPage,
    }));
  };

  useEffect(() => {
    if (paginatedData.pageNumber > 1) {
      fetchJobPosts();
    }
  }, [paginatedData.pageNumber]);

  useEffect(() => {
    fetchJobPosts();
  }, []);

  return (
    <>
      <div className="main-gradient py-20">
        <div className="container mx-auto px-30">
          <div className="mb-8">
            <h1 className="text-secondary-foreground text-3xl font-bold mb-2">
              Tìm kiếm việc làm
            </h1>
            <p className="text-secondary-foreground/80">
              Khám phá hàng nghìn cơ hội việc làm IT phù hợp với kỹ năng của bạn
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm theo chức danh, công ty, kỹ năng..."
                className="pl-10 h-12 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <Dialog
              open={isFilterDialogOpen}
              onOpenChange={setIsFilterDialogOpen}
              modal={false}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="h-12 gap-2 bg-background">
                  <Filter className="h-5 w-5" />
                  Bộ lọc
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onInteractOutside={(e) => {
                  // Ngăn không cho dialog đóng khi click vào filter components
                  const target = e.target;
                  const isFilterInteraction =
                    target.closest("[data-radix-popover-content]") ||
                    target.closest("[data-radix-popper-content-wrapper]") ||
                    target.closest("[data-radix-select-content]") ||
                    target.closest("[data-radix-select-viewport]") ||
                    target.closest("[data-radix-select-item]") ||
                    target.closest("[data-radix-checkbox-root]") ||
                    target.closest("[data-radix-combobox-content]") ||
                    target.closest('[role="listbox"]') ||
                    target.closest('[role="option"]') ||
                    target.closest('[role="combobox"]') ||
                    target.closest(
                      '[role="button"][aria-haspopup="listbox"]'
                    ) ||
                    target.closest('[data-state="open"]') ||
                    target.closest(".lucide-check") ||
                    target.closest(".lucide-chevron-down") ||
                    target.hasAttribute("data-radix-collection-item");

                  if (isFilterInteraction) {
                    e.preventDefault();
                  }
                }}
              >
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle>Bộ lọc tìm kiếm</DialogTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-sm text-muted-foreground"
                    >
                      Xóa tất cả
                    </Button>
                  </div>
                </DialogHeader>

                <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                  <SearchFilter
                    key={keyRenderFilter}
                    className="w-full"
                    onRangeChange={handleRangeFilterChange}
                    onCheckboxChange={handleCheckboxFilterChange}
                    onComboboxChange={handleComboboxFilterChange}
                    initialRangeFilters={initialRangeFilters}
                    initialCheckboxFilters={initialCheckboxFilters}
                    initialComboboxFilters={initialComboboxFilters}
                  />
                </div>

                <DialogFooter className="mt-6">
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={handleDialogCancel}
                  >
                    Hủy
                  </Button>
                  <Button onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? "Đang tìm kiếm..." : "Áp dụng bộ lọc"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              className="h-12"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? "Đang tìm kiếm..." : "Tìm kiếm"}
            </Button>
          </div>

          {activeFilterCount > 0 && (
            <div className="mt-6 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-secondary-foreground/80">
                Lọc theo:
              </span>
              <Badge
                variant="outline"
                className="flex items-center gap-1 bg-background"
              >
                {activeFilterCount} bộ lọc đang áp dụng
                <button onClick={clearAllFilters} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-30 pt-15">
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
                Tìm thấy {paginatedData.totalRecords} việc làm
              </p>
            )}
          </div>
        )}

        <Card>
          <CardHeader className="border-b bg-muted/50">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Kết quả tìm kiếm</h2>
              <span className="text-sm text-muted-foreground">
                {paginatedData.totalRecords} việc làm
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {isSearching ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-xl" />
                ))}
              </div>
            ) : paginatedData.items.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Filter className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Không tìm thấy việc làm
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm
                    ? "Không tìm thấy việc làm phù hợp với từ khóa tìm kiếm"
                    : "Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc của bạn"}
                </p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Xóa tất cả bộ lọc
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedData.items.map((job) => (
                  <JobPostSummaryCard key={job.postId} jobPost={job} />
                ))}
              </div>
            )}
          </CardContent>

          {paginatedData.totalPages > 1 && (
            <CardFooter className="border-t p-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  {paginatedData.hasPrevious && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          handlePageChange(paginatedData.pageNumber - 1)
                        }
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}

                  {Array.from(
                    { length: paginatedData.totalPages },
                    (_, i) => i + 1
                  )
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === paginatedData.totalPages ||
                        Math.abs(page - paginatedData.pageNumber) <= 1
                    )
                    .reduce((acc, page, i, arr) => {
                      if (i > 0 && arr[i - 1] !== page - 1) {
                        acc.push(
                          <PaginationItem key={`ellipsis-${page}`}>
                            <span className="px-4">...</span>
                          </PaginationItem>
                        );
                      }
                      acc.push(
                        <PaginationItem key={page}>
                          <Button
                            variant={
                              page === paginatedData.pageNumber
                                ? "default"
                                : "outline"
                            }
                            size="icon"
                            onClick={() => handlePageChange(page)}
                            className={
                              page === paginatedData.pageNumber
                                ? "bg-primary text-primary-foreground"
                                : "cursor-pointer"
                            }
                          >
                            {page}
                          </Button>
                        </PaginationItem>
                      );
                      return acc;
                    }, [])}

                  {paginatedData.hasNext && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(paginatedData.pageNumber + 1)
                        }
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </CardFooter>
          )}
        </Card>
      </div>
    </>
  );
}
