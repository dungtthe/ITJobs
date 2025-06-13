import { Input } from "@/components/ui/input";
import { TextEditor } from "@/components/my-components/text-editor/TextEditor";
import React from "react";
import { useState, useRef, useEffect } from "react";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/MyToast";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { addJobPost } from "@/pages/employer/posts/job-post/services/addJobPost.js";
import { SearchFilter } from "@/components/my-components/search-filter/SearchFilter";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useAccountBalanceStore } from "@/stores/authStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { differenceInCalendarDays, addDays } from "date-fns";
import { getSearchFilters } from "@/shared-services/search-filters/getSearchFilters.js";

import { getJobPostFeePerDay } from "@/shared-services/system-value/getJobPostFeePerDay.js";
import { formatVND } from "@/utils/formatUtils.js";
export default function AddJobPost() {
  const navigate = useNavigate();
  const [searchFiltersMetadata, setSearchFiltersMetadata] = useState({
    ranges: [],
    checkboxs: [],
    comboboxs: [],
  });
  const setAccountBalance = useAccountBalanceStore(
    (state) => state.setAccountBalance
  );
  const [keyRenderImediately, setKeyRenderImediately] = useState(0);
  const [title, setTitle] = useState("");
  const insertContentRef = useRef(null);
  const [content, setContent] = useState("");
  const [jobPostFeePerDay, setJobPostFeePerDay] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [date, setDate] = useState();
  useEffect(() => {
    getJobPostFeePerDay((data) => {
      setJobPostFeePerDay(data.fee);
    });
  }, []);
  useEffect(() => {
    getSearchFilters((data) => {
      setSearchFiltersMetadata({
        ranges: data.searchFilterRanges || [],
        checkboxs: data.searchFilterCheckBoxs || [],
        comboboxs: data.searchFilterComboboxs || [],
      });
    });
  }, []);
  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    if (selectedDate) {
      const today = new Date();
      const startDate = addDays(today, 1); // tính từ 00h ngày mai
      const endDate = selectedDate;

      const days =
        Math.max(0, differenceInCalendarDays(endDate, startDate)) + 1;
      const totalCost = days * jobPostFeePerDay;
      setTotalCost(totalCost);

      setTotalCost(days * jobPostFeePerDay);
    } else {
      setTotalCost(0);
    }
  };

  const selectedRangeFiltersRef = useRef({});
  const selectedCheckboxFiltersRef = useRef({});
  const selectedComboboxFiltersRef = useRef({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleHuy = () => {
    setDate(undefined);
    handleDateSelect(undefined);
    insertContentRef.current = "";
    setTitle("");
    setContent("");
    selectedRangeFiltersRef.current = {};
    selectedCheckboxFiltersRef.current = {};
    selectedComboboxFiltersRef.current = {};
    setKeyRenderImediately((prev) => prev + 1);
  };

  const handleSaveContent = (editorContent) => {
    setContent(editorContent);
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

  const handleSubmit = async (content) => {
    if (!date) {
      showErrorToastHasTitle("Lỗi", "Vui lòng chọn ngày dừng tuyển dụng");
      return;
    }
    console.log(date);
    if (!title) {
      showErrorToastHasTitle("Lỗi", "Vui lòng nhập tiêu đề bài đăng");
      return;
    }

    if (!content) {
      showErrorToastHasTitle("Lỗi", "Vui lòng nhập nội dung bài đăng");
      return;
    }

    setIsSubmitting(true);

    try {
      const jobPostData = {
        title: title,
        content: content,
        endDate: format(date, "yyyy-MM-dd"),
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

      console.log("data:", jobPostData);

      addJobPost(
        jobPostData,
        (sus) => {
          console.log("success:", sus);
          setAccountBalance(sus.accountBalance);
          showSuccessToastHasTitle("Thành công", "Đã lưu bài đăng tuyển dụng");
          handleHuy();
          setIsSubmitting(false);
          setKeyRenderImediately((prev) => prev + 1);
          navigate(`/employer/job-post/${sus.postId}`);
        },
        (fail) => {
          console.error("fail:", fail);
          showErrorToastHasTitle("Lỗi", fail.message || "Đã có lỗi xảy ra");
          setIsSubmitting(false);
          return;
        },
        () => {}
      );
    } catch (error) {
      console.error("err job post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="pt-4 bg-background rounded-xl border pb-10">
        <div className="border-b pl-4 pb-4 flex gap-2 justify-between">
          <h1 className="text-2xl">Thêm bài đăng tuyển dụng</h1>
        </div>

        {/* input  */}
        <div className="p-4">
          <div className="flex">
            {/* input tieu de */}
            <div className="border rounded-lg p-4 flex-1">
              <label className="text-lg font-semibold ">Tiêu đề bài đăng</label>
              <Input
                className="mt-2"
                placeholder="Nhập tiêu đề"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            {/* ngày kết thúc tuyển dụng */}

            <div className="flex-1 border rounded-lg p-4 ml-4 flex flex-col">
              <label className="text-lg font-semibold">
                Ngày dừng tuyển dụng
              </label>
              <div className="flex items-center mt-2">
                <div className="flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span>Chọn ngày dừng tuyển dụng</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                        disabled={(date) => date < addDays(new Date(), 1)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex-1 border-l pl-5">
                  <div>
                    <span className="font-medium">Chi phí cho 1 ngày:</span>
                    <span> {formatVND(jobPostFeePerDay)}</span>
                  </div>
                  <div>
                    <span className="font-medium">Tổng chi phí:</span>
                    <span> {formatVND(totalCost)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border rounded-lg p-4 flex">
            <div className="w-1/3">
              <label className="text-lg font-semibold">Thêm bộ lọc</label>
              <SearchFilter
                key={keyRenderImediately}
                className="w-full"
                onRangeChange={handleRangeFilterChange}
                onCheckboxChange={handleCheckboxFilterChange}
                onComboboxChange={handleComboboxFilterChange}
              />
            </div>
            {/* texteditor */}
            <div className="w-2/3 pl-10">
              <label className="text-lg font-semibold">Nội dung bài đăng</label>
              <TextEditor
                handleHuy={handleHuy}
                key={keyRenderImediately}
                height={800}
                onSave={handleSaveContent}
                initialValue={insertContentRef.current}
                contentBtnSave={isSubmitting ? "Đang xử lý..." : "Lưu bài đăng"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
