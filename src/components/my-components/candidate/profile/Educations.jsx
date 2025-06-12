import { IconEdit } from "@/components/my-components/icon/IconEdit";
import { IconDelete } from "@/components/my-components/icon/IconDelete";
import { IconAdd } from "@/components/my-components/icon/IconAdd";
import { ButtonSuccess } from "@/components/my-components/button/ButtonSuccess";
import { ButtonDestructive } from "@/components/my-components/button/ButtonDestructive";
import { Input } from "@/components/ui/input";
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
import { addOrUpdateEducation } from "@/pages/candidate/profile/services/addOrUpdateEducation";
import { deleteEducation } from "@/pages/candidate/profile/services/deleteEducation";

export const Educations = ({ educations = [], isCanEdit = false }) => {
  const [isEnableEdit, setIsEnableEdit] = useState(false);
  const [educationsData, setEducationsData] = useState([]);
  const [editingEducation, setEditingEducation] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    websiteUrl: "",
    degree: "",
    fieldOfStudy: "",
    startDate: null,
    isCompleted: false,
    gpa: 0,
  });

  const defaultEducationsData = useRef([]);

  useEffect(() => {
    if (educations && educations.length > 0) {
      const processedEducations = educations.map((edu) => ({
        ...edu,
        startDate: edu.startDate ? new Date(edu.startDate) : null,
      }));
      setEducationsData(processedEducations);
      defaultEducationsData.current = [...processedEducations];
    }
  }, [educations]);

  const resetForm = () => {
    setFormData({
      name: "",
      websiteUrl: "",
      degree: "",
      fieldOfStudy: "",
      startDate: null,
      isCompleted: false,
      gpa: 0,
    });
  };

  const handleEnableEdit = () => {
    setIsEnableEdit(true);
  };

  const handleCancel = () => {
    setIsEnableEdit(false);
    setIsAddingNew(false);
    setEditingEducation(null);
    setEducationsData([...defaultEducationsData.current]);
    resetForm();
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingEducation(null);
    resetForm();
  };

  const handleEdit = (education) => {
    setEditingEducation(education.id);
    setIsAddingNew(false);
    setFormData({
      name: education.name || "",
      websiteUrl: education.websiteUrl || "",
      degree: education.degree || "",
      fieldOfStudy: education.fieldOfStudy || "",
      startDate: education.startDate,
      isCompleted: education.isCompleted || false,
      gpa: education.gpa || 0,
    });
  };

  const handleSaveEducation = () => {
    if (!formData.name.trim()) {
      showErrorToastHasTitle("Lỗi", "Tên cơ sở giáo dục không được để trống");
      return;
    }

    if (formData.name.trim().length > 500) {
      showErrorToastHasTitle(
        "Lỗi",
        "Tên cơ sở giáo dục không được vượt quá 500 ký tự"
      );
      return;
    }

    if (formData.websiteUrl.trim().length > 1000) {
      showErrorToastHasTitle("Lỗi", "Website không được vượt quá 1000 ký tự");
      return;
    }

    if (formData.degree.trim().length > 500) {
      showErrorToastHasTitle(
        "Lỗi",
        "Tên bằng cấp không được vượt quá 500 ký tự"
      );
      return;
    }

    if (formData.fieldOfStudy.trim().length > 500) {
      showErrorToastHasTitle(
        "Lỗi",
        "Tên ngành học không được vượt quá 500 ký tự"
      );
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

    const gpaValue = parseFloat(formData.gpa);
    if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 10) {
      showErrorToastHasTitle("Lỗi", "GPA phải nằm trong khoảng từ 0 đến 10");
      return;
    }

    const educationData = {
      educationId: editingEducation,
      name: formData.name.trim(),
      websiteUrl: formData.websiteUrl.trim(),
      degree: formData.degree.trim(),
      fieldOfStudy: formData.fieldOfStudy.trim(),
      startDate: formData.startDate,
      isCompleted: formData.isCompleted,
      gpa: parseFloat(formData.gpa),
    };

    addOrUpdateEducation(
      educationData,
      (response) => {
        const newEducation = {
          id: response.id,
          name: formData.name.trim(),
          websiteUrl: formData.websiteUrl.trim(),
          degree: formData.degree.trim(),
          fieldOfStudy: formData.fieldOfStudy.trim(),
          startDate: formData.startDate,
          isCompleted: formData.isCompleted,
          gpa: parseFloat(formData.gpa),
        };

        let updatedEducations;
        if (editingEducation) {
          updatedEducations = educationsData.map((edu) =>
            edu.id === editingEducation ? newEducation : edu
          );
        } else {
          // Add new
          updatedEducations = [...educationsData, newEducation];
        }

        setEducationsData(updatedEducations);
        defaultEducationsData.current = [...updatedEducations];

        showSuccessToastHasTitle(
          "Thành công",
          editingEducation
            ? "Cập nhật học vấn thành công"
            : "Thêm học vấn thành công"
        );
        handleCancel();

        setIsAddingNew(false);
        setEditingEducation(null);
        resetForm();
      },
      (error) => {
        console.log("Save error:", error);
        showErrorToastHasTitle(
          "Lỗi",
          error?.message || "Có lỗi xảy ra khi lưu thông tin học vấn"
        );
      },
      (exception) => {
        console.error("Exception in handleSaveEducation:", exception);
        showErrorToastHasTitle("Lỗi", "Đã xảy ra lỗi không mong muốn");
      }
    );
  };

  const handleDeleteEducation = (educationId) => {
    deleteEducation(
      educationId,
      () => {
        const updatedEducations = educationsData.filter(
          (edu) => edu.id !== educationId
        );
        setEducationsData(updatedEducations);
        defaultEducationsData.current = [...updatedEducations];

        showSuccessToastHasTitle("Thành công", "Xóa học vấn thành công");
        handleCancel();
      },
      (error) => {
        if (error && error.message) {
          showErrorToastHasTitle("Lỗi", error.message);
        } else {
          showErrorToastHasTitle(
            "Lỗi",
            "Có lỗi xảy ra khi xóa thông tin học vấn"
          );
        }
      },
      (exception) => {
        console.error("Exception in handleDeleteEducation:", exception);
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
          <h3 className="text-xl font-medium ">Học vấn</h3>
          <div>
            {!isAddingNew && !editingEducation && isEnableEdit && (
              <IconAdd onClick={handleAddNew} className="size-8" />
            )}
          </div>
        </div>
        {isCanEdit && !isEnableEdit && <IconEdit onClick={handleEnableEdit} />}
      </div>

      <div className="border border-dashed w-full h-[1px]"></div>

      <div className="mt-5">
        {educationsData.length === 0 && !isAddingNew ? (
          <p>Chưa có thông tin</p>
        ) : (
          <div className="space-y-4">
            {educationsData.map((education) => (
              <div key={education.id} className="border rounded-lg p-4">
                {editingEducation === education.id ? (
                  // Edit form
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Tên cơ sở giáo dục *
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Nhập tên trường/cơ sở giáo dục"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Website
                        </label>
                        <Input
                          value={formData.websiteUrl}
                          onChange={(e) =>
                            handleInputChange("websiteUrl", e.target.value)
                          }
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Bằng cấp
                        </label>
                        <Input
                          value={formData.degree}
                          onChange={(e) =>
                            handleInputChange("degree", e.target.value)
                          }
                          placeholder="Cử nhân, Thạc sĩ, Tiến sĩ..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Ngành học
                        </label>
                        <Input
                          value={formData.fieldOfStudy}
                          onChange={(e) =>
                            handleInputChange("fieldOfStudy", e.target.value)
                          }
                          placeholder="Công nghệ thông tin, Kinh tế..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Ngày bắt đầu
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
                          GPA
                        </label>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={formData.gpa}
                          onChange={(e) =>
                            handleInputChange("gpa", e.target.value)
                          }
                          placeholder="0.0"
                        />
                      </div>
                      <div className="flex items-center space-x-2 pt-6">
                        <input
                          type="checkbox"
                          id={`completed-${education.id}`}
                          checked={formData.isCompleted}
                          onChange={(e) =>
                            handleInputChange("isCompleted", e.target.checked)
                          }
                          className="rounded"
                        />
                        <label
                          htmlFor={`completed-${education.id}`}
                          className="text-sm"
                        >
                          Đã hoàn thành
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <ButtonDestructive
                        content="Hủy"
                        onClick={() => {
                          setEditingEducation(null);
                          resetForm();
                        }}
                      />
                      <ButtonSuccess
                        content="Lưu"
                        onClick={handleSaveEducation}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                        {education.degree && (
                          <div className="flex gap-2 items-center">
                            <label className="text-foreground/70 text-sm">
                              Bằng cấp:
                            </label>
                            <p className="text-foreground">
                              {education.degree}
                            </p>
                          </div>
                        )}
                        {education.fieldOfStudy && (
                          <div className="flex gap-2 items-center">
                            <label className="text-foreground/70 text-sm">
                              Ngành học:
                            </label>
                            <p className="text-foreground">
                              {education.fieldOfStudy}
                            </p>
                          </div>
                        )}
                        {education.startDate && (
                          <div className="flex gap-2 items-center">
                            <label className="text-foreground/70 text-sm">
                              Ngày bắt đầu:
                            </label>
                            <p className="text-foreground">
                              {format(education.startDate, "dd/MM/yyyy")}
                            </p>
                          </div>
                        )}
                        {education.gpa > 0 && (
                          <div className="flex gap-2 items-center">
                            <label className="text-foreground/70 text-sm">
                              GPA:
                            </label>
                            <p className="text-foreground">
                              {education.gpa.toFixed(1)}
                            </p>
                          </div>
                        )}
                        <div className="flex gap-2 items-center">
                          <label className="text-foreground/70 text-sm">
                            Trạng thái:
                          </label>
                          <p className="text-foreground">
                            {education.isCompleted
                              ? "Đã hoàn thành"
                              : "Đang học"}
                          </p>
                        </div>
                        {education.websiteUrl && (
                          <div className="flex items-center gap-2">
                            <label className="text-foreground/70 text-sm">
                              Website:{" "}
                            </label>
                            <a
                              href={education.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              <FaLink className="text-mlink"></FaLink>
                            </a>
                          </div>
                        )}
                      </div>

                      {isEnableEdit && (
                        <div className="flex gap-2 ml-4">
                          <IconEdit onClick={() => handleEdit(education)} />
                          <IconDelete
                            onClick={() => handleDeleteEducation(education.id)}
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
                <h4 className="font-medium mb-4">Thêm học vấn mới</h4>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Tên cơ sở giáo dục *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Nhập tên trường/cơ sở giáo dục"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Website
                      </label>
                      <Input
                        value={formData.websiteUrl}
                        onChange={(e) =>
                          handleInputChange("websiteUrl", e.target.value)
                        }
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Bằng cấp
                      </label>
                      <Input
                        value={formData.degree}
                        onChange={(e) =>
                          handleInputChange("degree", e.target.value)
                        }
                        placeholder="Cử nhân, Thạc sĩ, Tiến sĩ..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Ngành học
                      </label>
                      <Input
                        value={formData.fieldOfStudy}
                        onChange={(e) =>
                          handleInputChange("fieldOfStudy", e.target.value)
                        }
                        placeholder="Công nghệ thông tin, Kinh tế..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Ngày bắt đầu
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
                        GPA
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={formData.gpa}
                        onChange={(e) =>
                          handleInputChange("gpa", e.target.value)
                        }
                        placeholder="0.0"
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <input
                        type="checkbox"
                        id="completed-new"
                        checked={formData.isCompleted}
                        onChange={(e) =>
                          handleInputChange("isCompleted", e.target.checked)
                        }
                        className="rounded"
                      />
                      <label htmlFor="completed-new" className="text-sm">
                        Đã hoàn thành
                      </label>
                    </div>
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
                      onClick={handleSaveEducation}
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
