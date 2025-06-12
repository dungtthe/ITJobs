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
import { addOrUpdateAward } from "@/pages/candidate/profile/services/addOrUpdateAward";
import { deleteAward } from "@/pages/candidate/profile/services/deleteAward";

export const Awards = ({ awards = [], isCanEdit = false }) => {
  const [isEnableEdit, setIsEnableEdit] = useState(false);
  const [awardsData, setAwardsData] = useState([]);
  const [editingAward, setEditingAward] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    receivedDate: null,
    description: "",
    websiteUrl: "",
  });

  const defaultAwardsData = useRef([]);

  useEffect(() => {
    if (awards && awards.length > 0) {
      const processedAwards = awards.map((award) => ({
        ...award,
        receivedDate: award.receivedDate ? new Date(award.receivedDate) : null,
      }));
      setAwardsData(processedAwards);
      defaultAwardsData.current = [...processedAwards];
    }
  }, [awards]);

  const resetForm = () => {
    setFormData({
      name: "",
      organization: "",
      receivedDate: null,
      description: "",
      websiteUrl: "",
    });
  };

  const handleEnableEdit = () => {
    setIsEnableEdit(true);
  };

  const handleCancel = () => {
    setIsEnableEdit(false);
    setIsAddingNew(false);
    setEditingAward(null);
    setAwardsData([...defaultAwardsData.current]);
    resetForm();
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingAward(null);
    resetForm();
  };

  const handleEdit = (award) => {
    setEditingAward(award.id);
    setIsAddingNew(false);
    setFormData({
      name: award.name || "",
      organization: award.organization || "",
      receivedDate: award.receivedDate,
      description: award.description || "",
      websiteUrl: award.websiteUrl || "",
    });
  };

  const handleSaveAward = () => {
    if (!formData.name.trim()) {
      showErrorToastHasTitle("Lỗi", "Tên giải thưởng không được để trống");
      return;
    }

    if (formData.name.trim().length > 500) {
      showErrorToastHasTitle(
        "Lỗi",
        "Tên giải thưởng không được vượt quá 500 ký tự"
      );
      return;
    }

    if (formData.organization.trim().length > 1000) {
      showErrorToastHasTitle(
        "Lỗi",
        "Tên tổ chức không được vượt quá 1000 ký tự"
      );
      return;
    }

    if (formData.description.trim().length > 5000) {
      showErrorToastHasTitle("Lỗi", "Mô tả không được vượt quá 5000 ký tự");
      return;
    }

    if (formData.websiteUrl.trim().length > 1000) {
      showErrorToastHasTitle("Lỗi", "Website không được vượt quá 1000 ký tự");
      return;
    }

    if (!formData.receivedDate) {
      showErrorToastHasTitle("Lỗi", "Vui lòng chọn ngày nhận giải thưởng");
      return;
    }

    if (formData.receivedDate && formData.receivedDate > new Date()) {
      showErrorToastHasTitle(
        "Lỗi",
        "Ngày nhận giải thưởng không thể là ngày trong tương lai"
      );
      return;
    }

    const awardData = {
      awardId: editingAward,
      name: formData.name.trim(),
      organization: formData.organization.trim(),
      receivedDate: formData.receivedDate,
      description: formData.description.trim(),
      websiteUrl: formData.websiteUrl.trim(),
    };

    addOrUpdateAward(
      awardData,
      (response) => {
        const newAward = {
          id: response.id,
          name: formData.name.trim(),
          organization: formData.organization.trim(),
          receivedDate: formData.receivedDate,
          description: formData.description.trim(),
          websiteUrl: formData.websiteUrl.trim(),
        };

        let updatedAwards;
        if (editingAward) {
          updatedAwards = awardsData.map((award) =>
            award.id === editingAward ? newAward : award
          );
        } else {
          // Add new
          updatedAwards = [...awardsData, newAward];
        }

        setAwardsData(updatedAwards);
        defaultAwardsData.current = [...updatedAwards];

        showSuccessToastHasTitle(
          "Thành công",
          editingAward
            ? "Cập nhật giải thưởng thành công"
            : "Thêm giải thưởng thành công"
        );
        handleCancel();

        setIsAddingNew(false);
        setEditingAward(null);
        resetForm();
      },
      (error) => {
        console.log("Save error:", error);
        showErrorToastHasTitle(
          "Lỗi",
          error?.message || "Có lỗi xảy ra khi lưu thông tin giải thưởng"
        );
      },
      (exception) => {
        console.error("Exception in handleSaveAward:", exception);
        showErrorToastHasTitle("Lỗi", "Đã xảy ra lỗi không mong muốn");
      }
    );
  };

  const handleDeleteAward = (awardId) => {
    deleteAward(
      awardId,
      () => {
        const updatedAwards = awardsData.filter(
          (award) => award.id !== awardId
        );
        setAwardsData(updatedAwards);
        defaultAwardsData.current = [...updatedAwards];

        showSuccessToastHasTitle("Thành công", "Xóa giải thưởng thành công");
        handleCancel();
      },
      (error) => {
        if (error && error.message) {
          showErrorToastHasTitle("Lỗi", error.message);
        } else {
          showErrorToastHasTitle(
            "Lỗi",
            "Có lỗi xảy ra khi xóa thông tin giải thưởng"
          );
        }
      },
      (exception) => {
        console.error("Exception in handleDeleteAward:", exception);
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
          <h3 className="text-xl font-medium ">Giải thưởng</h3>
          <div>
            {!isAddingNew && !editingAward && isEnableEdit && (
              <IconAdd onClick={handleAddNew} className="size-8" />
            )}
          </div>
        </div>
        {isCanEdit && !isEnableEdit && <IconEdit onClick={handleEnableEdit} />}
      </div>

      <div className="border border-dashed w-full h-[1px]"></div>

      <div className="mt-5">
        {awardsData.length === 0 && !isAddingNew ? (
          <p>Chưa có thông tin</p>
        ) : (
          <div className="space-y-4">
            {awardsData.map((award) => (
              <div key={award.id} className="border rounded-lg p-4">
                {editingAward === award.id ? (
                  // Edit form
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Tên giải thưởng *
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Nhập tên giải thưởng"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Tổ chức
                        </label>
                        <Input
                          value={formData.organization}
                          onChange={(e) =>
                            handleInputChange("organization", e.target.value)
                          }
                          placeholder="Nhập tên tổ chức"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Ngày nhận giải
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              className={cn(
                                "w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none"
                              )}
                            >
                              {formData.receivedDate
                                ? format(formData.receivedDate, "dd/MM/yyyy")
                                : "Chọn ngày nhận giải"}
                              <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <MyCalendar
                              mode="single"
                              selected={formData.receivedDate}
                              onSelect={(date) =>
                                handleInputChange("receivedDate", date)
                              }
                              disabled={(date) => date > new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
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

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Mô tả
                      </label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        placeholder="Mô tả về giải thưởng"
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="flex gap-2 justify-end">
                      <ButtonDestructive
                        content="Hủy"
                        onClick={() => {
                          setEditingAward(null);
                          resetForm();
                        }}
                      />
                      <ButtonSuccess content="Lưu" onClick={handleSaveAward} />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                        {award.name && (
                          <div className="flex gap-2 items-center">
                            <label className="text-foreground/70 text-sm">
                              Tên giải thưởng:
                            </label>
                            <p className="text-foreground">{award.name}</p>
                          </div>
                        )}

                        {award.organization && (
                          <div className="flex gap-2 items-center">
                            <label className="text-foreground/70 text-sm">
                              Tổ chức:
                            </label>
                            <p className="text-foreground">
                              {award.organization}
                            </p>
                          </div>
                        )}
                        {award.receivedDate && (
                          <div className="flex gap-2 items-center">
                            <label className="text-foreground/70 text-sm">
                              Ngày nhận giải:
                            </label>
                            <p className="text-foreground">
                              {format(award.receivedDate, "dd/MM/yyyy")}
                            </p>
                          </div>
                        )}
                        {award.websiteUrl && (
                          <div className="flex items-center gap-2">
                            <label className="text-foreground/70 text-sm">
                              Website:{" "}
                            </label>
                            <a
                              href={award.websiteUrl}
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
                          <IconEdit onClick={() => handleEdit(award)} />
                          <IconDelete
                            onClick={() => handleDeleteAward(award.id)}
                          />
                        </div>
                      )}
                    </div>
                    {award.description && (
                      <div className="mt-3">
                        <label className="text-foreground/70 text-sm block mb-1">
                          Mô tả:
                        </label>
                        <p className="text-foreground whitespace-pre-wrap break-words min-w-0 flex-1">
                          {award.description}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isAddingNew && (
              <div className="border rounded-lg p-4 border-dashed">
                <h4 className="font-medium mb-4">Thêm giải thưởng mới</h4>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Tên giải thưởng *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Nhập tên giải thưởng"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Tổ chức
                      </label>
                      <Input
                        value={formData.organization}
                        onChange={(e) =>
                          handleInputChange("organization", e.target.value)
                        }
                        placeholder="Nhập tên tổ chức"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Ngày nhận giải
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            className={cn(
                              "w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none"
                            )}
                          >
                            {formData.receivedDate
                              ? format(formData.receivedDate, "dd/MM/yyyy")
                              : "Chọn ngày nhận giải"}
                            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <MyCalendar
                            mode="single"
                            selected={formData.receivedDate}
                            onSelect={(date) =>
                              handleInputChange("receivedDate", date)
                            }
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Mô tả
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Mô tả về giải thưởng"
                      className="min-h-[100px]"
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
                    <ButtonSuccess content="Lưu" onClick={handleSaveAward} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {isEnableEdit && !isAddingNew && !editingAward && (
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
