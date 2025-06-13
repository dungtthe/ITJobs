import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { TextEditor } from "@/components/my-components/text-editor/TextEditor";
import { Button } from "@/components/ui/button";
import { SearchFilter } from "@/components/my-components/search-filter/SearchFilter";
import { IconEdit } from "@/components/my-components/icon/IconEdit";
import { Skeleton } from "@/components/ui/skeleton";
import { sanitizeHtml } from "@/utils/sanitizeHtmlUtils";
import { formatDate, formatVND } from "@/utils/formatUtils.js";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/MyToast";
import { getJobPostById } from "../services/getJobPostById";
import { updateJobPost } from "../services/updateJobPost";
import { ArrowLeft } from "lucide-react";
import { getSearchFilters } from "@/shared-services/search-filters/getSearchFilters.js";

export default function DetailJobPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobPost, setJobPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit states
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [processedContent, setProcessedContent] = useState("");

  const selectedRangeFiltersRef = useRef({});
  const selectedCheckboxFiltersRef = useRef({});
  const selectedComboboxFiltersRef = useRef({});
  const [keyRenderFilter, setKeyRenderFilter] = useState(0);

  const [initialRangeFilters, setInitialRangeFilters] = useState({});
  const [initialCheckboxFilters, setInitialCheckboxFilters] = useState({});
  const [initialComboboxFilters, setInitialComboboxFilters] = useState({});

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

  useEffect(() => {
    if (id) {
      fetchJobPost();
    }
  }, [id]);

  useEffect(() => {
    if (jobPost?.content) {
      setProcessedContent(sanitizeHtml(jobPost.content));
    }
  }, [jobPost?.content]);

  const fetchJobPost = () => {
    setLoading(true);
    getJobPostById(
      id,
      (data) => {
        setJobPost(data);
        setEditTitle(data.title);
        setEditContent(data.content);

        const rangeFilters = {};
        const checkboxFilters = {};
        const comboboxFilters = {};

        data.searchFilterRanges?.forEach((filter) => {
          rangeFilters[filter.searchFilterId] = {
            min: parseInt(filter.min),
            max: parseInt(filter.max),
          };
        });

        data.searchFilterCheckBoxs?.forEach((filter) => {
          checkboxFilters[filter.searchFilterId] = filter.values;
        });

        data.searchFilterComboboxs?.forEach((filter) => {
          comboboxFilters[filter.searchFilterId] = filter.value;
        });

        selectedRangeFiltersRef.current = rangeFilters;
        selectedCheckboxFiltersRef.current = checkboxFilters;
        selectedComboboxFiltersRef.current = comboboxFilters;

        setInitialRangeFilters(rangeFilters);
        setInitialCheckboxFilters(checkboxFilters);
        setInitialComboboxFilters(comboboxFilters);

        setLoading(false);
      },
      (error) => {
        setLoading(false);
        showErrorToastHasTitle("Lỗi", error.message || "Không thể tải dữ liệu");
        navigate("/employer/job-post");
      },
      (exception) => {
        setLoading(false);
        showErrorToastHasTitle("Lỗi", "Đã có lỗi xảy ra");
        navigate("/employer/job-post");
      }
    );
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setKeyRenderFilter((prev) => prev + 1);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditTitle(jobPost.title);
    setEditContent(jobPost.content);

    const rangeFilters = {};
    const checkboxFilters = {};
    const comboboxFilters = {};

    jobPost.searchFilterRanges?.forEach((filter) => {
      rangeFilters[filter.searchFilterId] = {
        min: parseInt(filter.min),
        max: parseInt(filter.max),
      };
    });

    jobPost.searchFilterCheckBoxs?.forEach((filter) => {
      checkboxFilters[filter.searchFilterId] = filter.values;
    });

    jobPost.searchFilterComboboxs?.forEach((filter) => {
      comboboxFilters[filter.searchFilterId] = filter.value;
    });

    selectedRangeFiltersRef.current = rangeFilters;
    selectedCheckboxFiltersRef.current = checkboxFilters;
    selectedComboboxFiltersRef.current = comboboxFilters;

    setInitialRangeFilters(rangeFilters);
    setInitialCheckboxFilters(checkboxFilters);
    setInitialComboboxFilters(comboboxFilters);

    setKeyRenderFilter((prev) => prev + 1);
  };

  const handleSaveContent = (editorContent) => {
    //alert(editorContent);

    //  setEditContent(editorContent);
    handleSubmit(editorContent);
  };

  const handleRangeFilterChange = (id, range) => {
    selectedRangeFiltersRef.current[id] = range;
  };

  const handleCheckboxFilterChange = (id, selectedItems) => {
    const values = selectedItems.map((item) => item.value);
    selectedCheckboxFiltersRef.current[id] = values;
  };

  const handleComboboxFilterChange = (id, value) => {
    selectedComboboxFiltersRef.current[id] = value;
  };

  const handleSubmit = async (editContent) => {
    setEditContent(editContent);
    if (!editTitle) {
      showErrorToastHasTitle("Lỗi", "Vui lòng nhập tiêu đề bài đăng");
      return;
    }

    if (!editContent) {
      showErrorToastHasTitle("Lỗi", "Vui lòng nhập nội dung bài đăng");
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        postId: id,
        title: editTitle,
        content: editContent,
        SearchFilterRanges: Object.entries(selectedRangeFiltersRef.current)
          .filter(([id, range]) => {
            const filterMetadata = searchFiltersMetadata.ranges.find(
              (filter) => filter.id.toString() === id
            );

            if (!filterMetadata) return false;

            return (
              range &&
              range.min !== undefined &&
              range.max !== undefined &&
              range.min <= range.max &&
              range.min > filterMetadata.min &&
              range.max < filterMetadata.max
            );
          })
          .map(([id, range]) => ({
            SearchFilterId: id,
            Min: range.min.toString(),
            Max: range.max.toString(),
          })),
        SearchFilterCheckBoxs: Object.entries(
          selectedCheckboxFiltersRef.current
        )
          .filter(([id, values]) => {
            return values && Array.isArray(values) && values.length > 0;
          })
          .map(([id, values]) => ({
            SearchFilterId: id,
            Values: values,
          })),
        SearchFilterComboboxs: Object.entries(
          selectedComboboxFiltersRef.current
        )
          .filter(([id, value]) => {
            return value && value.toString().trim() !== "";
          })
          .map(([id, value]) => ({
            SearchFilterId: id,
            Value: value,
          })),
      };

      updateJobPost(
        updateData,
        (success) => {
          showSuccessToastHasTitle(
            "Thành công",
            "Đã cập nhật bài đăng tuyển dụng"
          );
          setIsEditMode(false);
          fetchJobPost(); // Reload data
        },
        (fail) => {
          showErrorToastHasTitle("Lỗi", fail.message || "Đã có lỗi xảy ra");
        },
        (exception) => {
          console.error("Error updating job post:", exception);
          showErrorToastHasTitle("Lỗi", "Đã có lỗi xảy ra");
        }
      );
    } catch (error) {
      console.error("Error updating job post:", error);
      showErrorToastHasTitle("Lỗi", "Đã có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getJobStatus = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);

    if (end < today) {
      return (
        <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700 font-medium">
          Hết hạn
        </span>
      );
    } else {
      const diffTime = Math.abs(end - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return (
        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 font-medium">
          Còn {diffDays} ngày
        </span>
      );
    }
  };

  const getFilterName = (filterId, filterType) => {
    let filters = [];
    switch (filterType) {
      case "range":
        filters = searchFiltersMetadata.ranges;
        break;
      case "checkbox":
        filters = searchFiltersMetadata.checkboxs;
        break;
      case "combobox":
        filters = searchFiltersMetadata.comboboxs;
        break;
    }
    const filter = filters.find((f) => f.id === filterId);
    return filter ? filter.name : `Bộ lọc ${filterId}`;
  };

  const formatRangeValue = (min, max, filterName) => {
    const isMoneyFilter = filterName?.toLowerCase().includes("lương");
    if (isMoneyFilter) {
      return `${formatVND(min)} - ${formatVND(max)}`;
    }
    return `${min} - ${max}`;
  };

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="h-[80vh] w-full" />
      </div>
    );
  }

  if (!jobPost) {
    return (
      <div className="p-6 text-center">
        <p>Không tìm thấy bài đăng</p>
      </div>
    );
  }

  return (
    <div className="pt-4 bg-background rounded-xl border pb-10">
      <div className="border-b pl-4 pb-4 flex gap-2 justify-between items-center">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/employer/job-post")}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl">
            {isEditMode ? "Chỉnh sửa bài đăng" : "Chi tiết bài đăng"}
          </h1>
        </div>

        <div className="mr-4 flex gap-2">
          {!isEditMode && <IconEdit onClick={handleEdit} />}
        </div>
      </div>

      <div className="p-4">
        {isEditMode ? (
          <>
            {/* Title Input */}
            <div className="flex">
              <div className="border rounded-lg p-4 flex-1">
                <label className="text-lg font-semibold">
                  Tiêu đề bài đăng
                </label>
                <Input
                  className="mt-2"
                  placeholder="Nhập tiêu đề"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Filters and Content */}
            <div className="mt-10 border rounded-lg p-4 flex">
              <div className="w-1/3">
                <label className="text-lg font-semibold">Cập nhật bộ lọc</label>
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

              <div className="w-2/3 pl-10">
                <label className="text-lg font-semibold">
                  Nội dung bài đăng
                </label>
                <TextEditor
                  key={keyRenderFilter}
                  height={800}
                  onSave={handleSaveContent}
                  initialValue={editContent}
                  handleHuy={handleCancel}
                  contentBtnSave={
                    isSubmitting ? "Đang cập nhật..." : "Cập nhật"
                  }
                />
              </div>
            </div>
          </>
        ) : (
          // View Mode
          <>
            {/* Job Info */}
            <div className="bg-muted/30 p-6 rounded-lg mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{jobPost.title}</h2>
                {getJobStatus(jobPost.endDate)}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
                <div className="flex items-center gap-2">
                  <label className="text-foreground/80 text-sm">
                    Ngày đăng:
                  </label>
                  <p>{formatDate(jobPost.createAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-foreground/80 text-sm">
                    Ngày cập nhật:
                  </label>
                  <p>{formatDate(jobPost.updateAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-foreground/80 text-sm">
                    Ngày kết thúc:
                  </label>
                  <p>{formatDate(jobPost.endDate)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-foreground/80 text-sm">
                    Lượt xem:
                  </label>
                  <p>{jobPost.viewCount}</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-foreground/80 text-sm">
                    Phí đăng tin:
                  </label>
                  <p>{formatVND(jobPost.postingFee)}</p>
                </div>
              </div>
            </div>

            {/* Job Content */}
            <div className="bg-background border rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Nội dung bài đăng</h3>
              </div>
              <div className="border border-dashed w-full h-[1px] mb-6"></div>
              <div
                className="tinymce-content"
                dangerouslySetInnerHTML={{
                  __html: processedContent || jobPost.content,
                }}
              />
            </div>

            {/* Search Filters Display */}
            {(jobPost.searchFilterRanges?.length > 0 ||
              jobPost.searchFilterCheckBoxs?.length > 0 ||
              jobPost.searchFilterComboboxs?.length > 0) && (
              <div className="bg-background border rounded-lg p-6 mt-6">
                <h3 className="text-xl font-semibold mb-4">Bộ lọc tìm kiếm</h3>
                <div className="border border-dashed w-full h-[1px] mb-6"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Range Filters */}
                  {jobPost.searchFilterRanges?.map((filter, index) => (
                    <div
                      key={`range-${index}`}
                      className="bg-muted/30 p-4 rounded-lg"
                    >
                      <label className="text-foreground/80 text-sm mb-2">
                        {getFilterName(filter.searchFilterId, "range")}
                      </label>
                      <p>
                        {formatRangeValue(
                          filter.min,
                          filter.max,
                          getFilterName(filter.searchFilterId, "range")
                        )}
                      </p>
                    </div>
                  ))}

                  {/* Checkbox Filters */}
                  {jobPost.searchFilterCheckBoxs?.map((filter, index) => (
                    <div
                      key={`checkbox-${index}`}
                      className="bg-muted/30 p-4 rounded-lg"
                    >
                      <label className="text-foreground/80 text-sm mb-2">
                        {getFilterName(filter.searchFilterId, "checkbox")}
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {filter.values
                          .map((value, valueIndex) => (
                            <p key={valueIndex}>{value}</p>
                          ))
                          .reduce((acc, curr, index) => {
                            if (index === 0) return [curr];
                            return [...acc, ", ", curr];
                          }, [])}
                      </div>
                    </div>
                  ))}
                  {/* Combobox Filters */}
                  {jobPost.searchFilterComboboxs?.map((filter, index) => (
                    <div
                      key={`combobox-${index}`}
                      className="bg-muted/30 p-4 rounded-lg"
                    >
                      <label className="text-foreground/80 text-sm mb-2">
                        {getFilterName(filter.searchFilterId, "combobox")}
                      </label>
                      <p>{filter.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
