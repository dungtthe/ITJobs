import { IconEdit } from "@/components/my-components/icon/IconEdit";
import { IconDelete } from "@/components/my-components/icon/IconDelete";
import { IconAdd } from "@/components/my-components/icon/IconAdd";
import { ButtonSuccess } from "@/components/my-components/button/ButtonSuccess";
import { ButtonDestructive } from "@/components/my-components/button/ButtonDestructive";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaLink } from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MyCalendar } from "@/components/my-components/MyCalendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState, useEffect, useRef } from "react";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/MyToast";
import { addOrUpdateWorkExperience } from "@/pages/candidate/profile/services/addOrUpdateWorkExperience";
import { deleteWorkExperience } from "@/pages/candidate/profile/services/deleteWorkExperience";

export const WorkExperiences = ({
  workExperiences = [],
  isCanEdit = false,
}) => {
  const [isEnableEdit, setIsEnableEdit] = useState(false);
  const [workExperiencesData, setWorkExperiencesData] = useState([]);
  const [editingWorkExperience, setEditingWorkExperience] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    websiteUrl: "",
    isCurrent: false,
    startDate: null,
    endDate: null,
    description: "",
  });

  const defaultWorkExperiencesData = useRef([]);

  useEffect(() => {
    if (workExperiences && workExperiences.length > 0) {
      const processedWorkExperiences = workExperiences.map((exp) => ({
        ...exp,
        startDate: exp.startDate ? new Date(exp.startDate) : null,
        endDate: exp.endDate ? new Date(exp.endDate) : null,
      }));
      setWorkExperiencesData(processedWorkExperiences);
      defaultWorkExperiencesData.current = [...processedWorkExperiences];
    }
  }, [workExperiences]);

  const resetForm = () => {
    setFormData({
      jobTitle: "",
      companyName: "",
      websiteUrl: "",
      isCurrent: false,
      startDate: null,
      endDate: null,
      description: "",
    });
  };

  const handleEnableEdit = () => {
    setIsEnableEdit(true);
  };

  const handleCancel = () => {
    setIsEnableEdit(false);
    setIsAddingNew(false);
    setEditingWorkExperience(null);
    setWorkExperiencesData([...defaultWorkExperiencesData.current]);
    resetForm();
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingWorkExperience(null);
    resetForm();
  };

  const handleEdit = (workExperience) => {
    setEditingWorkExperience(workExperience.id);
    setIsAddingNew(false);
    setFormData({
      jobTitle: workExperience.jobTitle || "",
      companyName: workExperience.companyName || "",
      websiteUrl: workExperience.websiteUrl || "",
      isCurrent: workExperience.isCurrent || false,
      startDate: workExperience.startDate,
      endDate: workExperience.endDate,
      description: workExperience.description || "",
    });
  };

  const handleSaveWorkExperience = () => {
    if (!formData.jobTitle.trim()) {
      showErrorToastHasTitle("Lỗi", "Chức vụ không được để trống");
      return;
    }

    if (formData.jobTitle.trim().length > 500) {
      showErrorToastHasTitle("Lỗi", "Chức vụ không được vượt quá 500 ký tự");
      return;
    }

    if (formData.companyName.trim().length > 500) {
      showErrorToastHasTitle(
        "Lỗi",
        "Tên công ty không được vượt quá 500 ký tự"
      );
      return;
    }

    if (formData.websiteUrl.trim().length > 1000) {
      showErrorToastHasTitle("Lỗi", "Website không được vượt quá 1000 ký tự");
      return;
    }

    if (formData.description.trim().length > 5000) {
      showErrorToastHasTitle("Lỗi", "Mô tả không được vượt quá 5000 ký tự");
      return;
    }

    if (!formData.startDate) {
      showErrorToastHasTitle("Lỗi", "Vui lòng chọn ngày bắt đầu");
      return;
    }

    if (formData.startDate && formData.startDate > new Date()) {
      showErrorToastHasTitle(
        "Lỗi",
        "Ngày bắt đầu không thể là ngày trong tương lai"
      );
      return;
    }

    if (!formData.isCurrent && !formData.endDate) {
      showErrorToastHasTitle(
        "Lỗi",
        "Vui lòng chọn ngày kết thúc hoặc đánh dấu là công việc hiện tại"
      );
      return;
    }

    if (formData.endDate && formData.endDate > new Date()) {
      showErrorToastHasTitle(
        "Lỗi",
        "Ngày kết thúc không thể là ngày trong tương lai"
      );
      return;
    }

    if (
      formData.endDate &&
      formData.startDate &&
      formData.endDate < formData.startDate
    ) {
      showErrorToastHasTitle(
        "Lỗi",
        "Ngày kết thúc không thể trước ngày bắt đầu"
      );
      return;
    }

    const workExperienceData = {
      workExperienceId: editingWorkExperience,
      jobTitle: formData.jobTitle.trim(),
      companyName: formData.companyName.trim(),
      websiteUrl: formData.websiteUrl.trim(),
      isCurrent: formData.isCurrent,
      startDate: formData.startDate,
      endDate: formData.isCurrent ? null : formData.endDate,
      description: formData.description.trim(),
    };

    addOrUpdateWorkExperience(
      workExperienceData,
      (response) => {
        const newWorkExperience = {
          id: response.id,
          jobTitle: formData.jobTitle.trim(),
          companyName: formData.companyName.trim(),
          websiteUrl: formData.websiteUrl.trim(),
          isCurrent: formData.isCurrent,
          startDate: formData.startDate,
          endDate: formData.isCurrent ? null : formData.endDate,
          description: formData.description.trim(),
        };

        let updatedWorkExperiences;
        if (editingWorkExperience) {
          updatedWorkExperiences = workExperiencesData.map((exp) =>
            exp.id === editingWorkExperience ? newWorkExperience : exp
          );
        } else {
          // Add new
          updatedWorkExperiences = [...workExperiencesData, newWorkExperience];
        }

        setWorkExperiencesData(updatedWorkExperiences);
        defaultWorkExperiencesData.current = [...updatedWorkExperiences];

        showSuccessToastHasTitle(
          "Thành công",
          editingWorkExperience
            ? "Cập nhật kinh nghiệm làm việc thành công"
            : "Thêm kinh nghiệm làm việc thành công"
        );
        handleCancel();

        setIsAddingNew(false);
        setEditingWorkExperience(null);
        resetForm();
      },
      (error) => {
        console.log("Save error:", error);
        showErrorToastHasTitle(
          "Lỗi",
          error?.message ||
            "Có lỗi xảy ra khi lưu thông tin kinh nghiệm làm việc"
        );
      },
      (exception) => {
        console.error("Exception in handleSaveWorkExperience:", exception);
        showErrorToastHasTitle("Lỗi", "Đã xảy ra lỗi không mong muốn");
      }
    );
  };

  const handleDeleteWorkExperience = (workExperienceId) => {
    deleteWorkExperience(
      workExperienceId,
      () => {
        const updatedWorkExperiences = workExperiencesData.filter(
          (exp) => exp.id !== workExperienceId
        );
        setWorkExperiencesData(updatedWorkExperiences);
        defaultWorkExperiencesData.current = [...updatedWorkExperiences];

        showSuccessToastHasTitle(
          "Thành công",
          "Xóa kinh nghiệm làm việc thành công"
        );
        handleCancel();
      },
      (error) => {
        if (error && error.message) {
          showErrorToastHasTitle("Lỗi", error.message);
        } else {
          showErrorToastHasTitle(
            "Lỗi",
            "Có lỗi xảy ra khi xóa thông tin kinh nghiệm làm việc"
          );
        }
      },
      (exception) => {
        console.error("Exception in handleDeleteWorkExperience:", exception);
        showErrorToastHasTitle("Lỗi", "Đã xảy ra lỗi không mong muốn");
      }
    );
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-card p-5 rounded-lg">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-xl font-medium ">Kinh nghiệm làm việc</h3>
          <div>
            {!isAddingNew && !editingWorkExperience && isEnableEdit && (
              <IconAdd onClick={handleAddNew} className="size-8" />
            )}
          </div>
        </div>
        {isCanEdit && !isEnableEdit && <IconEdit onClick={handleEnableEdit} />}
      </div>

      <div className="border border-dashed w-full h-[1px]"></div>

      <div className="mt-5">
        {workExperiencesData.length === 0 && !isAddingNew ? (
          <p>Chưa có thông tin</p>
        ) : (
          <div className="space-y-4">
            {workExperiencesData.map((workExperience) => (
              <div key={workExperience.id} className="border rounded-lg p-4">
                {editingWorkExperience === workExperience.id ? (
                  // Edit form
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Chức vụ *
                        </label>
                        <Input
                          value={formData.jobTitle}
                          onChange={(e) =>
                            handleInputChange("jobTitle", e.target.value)
                          }
                          placeholder="Nhập chức vụ/vị trí công việc"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Tên công ty *
                        </label>
                        <Input
                          value={formData.companyName}
                          onChange={(e) =>
                            handleInputChange("companyName", e.target.value)
                          }
                          placeholder="Nhập tên công ty"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Website công ty
                      </label>
                      <Input
                        value={formData.websiteUrl}
                        onChange={(e) =>
                          handleInputChange("websiteUrl", e.target.value)
                        }
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Ngày bắt đầu *
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              className={cn(
                                "w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none"
                              )}
                            >
                              {formData.startDate
                                ? format(formData.startDate, "dd/MM/yyyy")
                                : "Chọn ngày bắt đầu"}
                              <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <MyCalendar
                              mode="single"
                              selected={formData.startDate}
                              onSelect={(date) =>
                                handleInputChange("startDate", date)
                              }
                              disabled={(date) => date > new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Ngày kết thúc
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              className={cn(
                                "w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none",
                                formData.isCurrent && "opacity-50"
                              )}
                              disabled={formData.isCurrent}
                            >
                              {formData.endDate && !formData.isCurrent
                                ? format(formData.endDate, "dd/MM/yyyy")
                                : formData.isCurrent
                                ? "Hiện tại"
                                : "Chọn ngày kết thúc"}
                              <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                            </button>
                          </PopoverTrigger>
                          {!formData.isCurrent && (
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <MyCalendar
                                mode="single"
                                selected={formData.endDate}
                                onSelect={(date) =>
                                  handleInputChange("endDate", date)
                                }
                                disabled={(date) =>
                                  date > new Date() ||
                                  (formData.startDate &&
                                    date < formData.startDate)
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          )}
                        </Popover>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`current-${workExperience.id}`}
                        checked={formData.isCurrent}
                        onChange={(e) => {
                          handleInputChange("isCurrent", e.target.checked);
                          if (e.target.checked) {
                            handleInputChange("endDate", null);
                          }
                        }}
                        className="rounded"
                      />
                      <label
                        htmlFor={`current-${workExperience.id}`}
                        className="text-sm"
                      >
                        Đây là công việc hiện tại của tôi
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Mô tả công việc
                      </label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        placeholder="Mô tả chi tiết về công việc, trách nhiệm, thành tích..."
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-2 justify-end">
                      <ButtonDestructive
                        content="Hủy"
                        onClick={() => {
                          setEditingWorkExperience(null);
                          resetForm();
                        }}
                      />
                      <ButtonSuccess
                        content="Lưu"
                        onClick={handleSaveWorkExperience}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                        <div className="flex gap-2 items-center">
                          <label className="text-foreground/70 text-sm">
                            Chức vụ:
                          </label>
                          <p className="text-foreground">
                            {workExperience.jobTitle}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <label className="text-foreground/70 text-sm">
                            Công ty:
                          </label>
                          <p className="text-foreground">
                            {workExperience.companyName === ""
                              ? "Chưa cập nhật"
                              : workExperience.companyName}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <label className="text-foreground/70 text-sm">
                            Thời gian:
                          </label>
                          <p className="text-foreground">
                            {format(workExperience.startDate, "dd/MM/yyyy")} -{" "}
                            {workExperience.isCurrent
                              ? "Hiện tại"
                              : format(workExperience.endDate, "dd/MM/yyyy")}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <label className="text-foreground/70 text-sm">
                            Trạng thái:
                          </label>
                          <p className="text-foreground">
                            {workExperience.isCurrent
                              ? "Đang làm việc"
                              : "Đã hoàn thành"}
                          </p>
                        </div>
                        {workExperience.websiteUrl && (
                          <div className="flex items-center gap-2">
                            <label className="text-foreground/70 text-sm">
                              Website:
                            </label>
                            <a
                              href={workExperience.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              <FaLink className="text-mlink"></FaLink>
                            </a>
                          </div>
                        )}
                        {workExperience.description && (
                          <div className="col-span-full">
                            <div className="flex gap-2 items-start">
                              <label className="text-foreground/70 text-sm flex-shrink-0">
                                Mô tả:
                              </label>
                              <p className="text-foreground whitespace-pre-wrap break-words min-w-0 flex-1">
                                {workExperience.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {isEnableEdit && (
                        <div className="flex gap-2 ml-4">
                          <IconEdit
                            onClick={() => handleEdit(workExperience)}
                          />
                          <IconDelete
                            onClick={() =>
                              handleDeleteWorkExperience(workExperience.id)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isAddingNew && (
              <div className="border rounded-lg p-4 border-dashed">
                <h4 className="font-medium mb-4">
                  Thêm kinh nghiệm làm việc mới
                </h4>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Chức vụ *
                      </label>
                      <Input
                        value={formData.jobTitle}
                        onChange={(e) =>
                          handleInputChange("jobTitle", e.target.value)
                        }
                        placeholder="Nhập chức vụ/vị trí công việc"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Tên công ty *
                      </label>
                      <Input
                        value={formData.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                        placeholder="Nhập tên công ty"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Website công ty
                    </label>
                    <Input
                      value={formData.websiteUrl}
                      onChange={(e) =>
                        handleInputChange("websiteUrl", e.target.value)
                      }
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Ngày bắt đầu *
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            className={cn(
                              "w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none"
                            )}
                          >
                            {formData.startDate
                              ? format(formData.startDate, "dd/MM/yyyy")
                              : "Chọn ngày bắt đầu"}
                            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <MyCalendar
                            mode="single"
                            selected={formData.startDate}
                            onSelect={(date) =>
                              handleInputChange("startDate", date)
                            }
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Ngày kết thúc
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            className={cn(
                              "w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none",
                              formData.isCurrent && "opacity-50"
                            )}
                            disabled={formData.isCurrent}
                          >
                            {formData.endDate && !formData.isCurrent
                              ? format(formData.endDate, "dd/MM/yyyy")
                              : formData.isCurrent
                              ? "Hiện tại"
                              : "Chọn ngày kết thúc"}
                            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                          </button>
                        </PopoverTrigger>
                        {!formData.isCurrent && (
                          <PopoverContent className="w-auto p-0" align="start">
                            <MyCalendar
                              mode="single"
                              selected={formData.endDate}
                              onSelect={(date) =>
                                handleInputChange("endDate", date)
                              }
                              disabled={(date) =>
                                date > new Date() ||
                                (formData.startDate &&
                                  date < formData.startDate)
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        )}
                      </Popover>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="current-new"
                      checked={formData.isCurrent}
                      onChange={(e) => {
                        handleInputChange("isCurrent", e.target.checked);
                        if (e.target.checked) {
                          handleInputChange("endDate", null);
                        }
                      }}
                      className="rounded"
                    />
                    <label htmlFor="current-new" className="text-sm">
                      Đây là công việc hiện tại của tôi
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Mô tả công việc
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Mô tả chi tiết về công việc, trách nhiệm, thành tích..."
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <ButtonDestructive
                      content="Hủy"
                      onClick={() => {
                        setIsAddingNew(false);
                        resetForm();
                      }}
                    />
                    <ButtonSuccess
                      content="Lưu"
                      onClick={handleSaveWorkExperience}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {isEnableEdit && (
          <div className="mt-5 flex justify-between">
            <div className="flex gap-2">
              <ButtonDestructive content="Thoát" onClick={handleCancel} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
