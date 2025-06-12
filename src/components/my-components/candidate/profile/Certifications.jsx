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
import { addOrUpdateCertification } from "@/pages/candidate/profile/services/addOrUpdateCertification";
import { deleteCertification } from "@/pages/candidate/profile/services/deleteCertification";
import { convertImageToBase64 } from "@/utils/imageUtils";

export const Certifications = ({ certifications = [], isCanEdit = false }) => {
  const [isEnableEdit, setIsEnableEdit] = useState(false);
  const [certificationsData, setCertificationsData] = useState([]);
  const [editingCertification, setEditingCertification] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    websiteUrl: "",
    description: "",
    receivedDate: null,
    images: [],
  });

  const defaultCertificationsData = useRef([]);
  const inputFileRef = useRef(null);

  useEffect(() => {
    if (certifications && certifications.length > 0) {
      const processedCertifications = certifications.map((cert) => ({
        ...cert,
        receivedDate: cert.receivedDate ? new Date(cert.receivedDate) : null,
        images: cert.images || [],
      }));
      setCertificationsData(processedCertifications);
      defaultCertificationsData.current = [...processedCertifications];
    }
  }, [certifications]);

  const resetForm = () => {
    setFormData({
      name: "",
      websiteUrl: "",
      description: "",
      receivedDate: null,
      images: [],
    });
  };

  const handleEnableEdit = () => {
    setIsEnableEdit(true);
  };

  const handleCancel = () => {
    setIsEnableEdit(false);
    setIsAddingNew(false);
    setEditingCertification(null);
    setCertificationsData([...defaultCertificationsData.current]);
    resetForm();
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingCertification(null);
    resetForm();
  };

  const handleEdit = (certification) => {
    setEditingCertification(certification.id);
    setIsAddingNew(false);
    setFormData({
      name: certification.name || "",
      websiteUrl: certification.websiteUrl || "",
      description: certification.description || "",
      receivedDate: certification.receivedDate,
      images: certification.images || [],
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      const imagePromises = files.map(async (file) => {
        if (!file.type.match("image.*")) {
          throw new Error(`File ${file.name} không phải là hình ảnh`);
        }
        return await convertImageToBase64(file);
      });

      const imageBase64Array = await Promise.all(imagePromises);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...imageBase64Array],
      }));
    } catch (error) {
      console.error("Error converting images:", error);
      showErrorToastHasTitle(
        "Lỗi",
        error.message || "Không thể xử lý hình ảnh"
      );
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleImageClick = (imageBase64) => {
    const byteCharacters = atob(imageBase64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const handleSaveCertification = () => {
    if (!formData.name.trim()) {
      showErrorToastHasTitle("Lỗi", "Tên chứng chỉ không được để trống");
      return;
    }

    if (formData.name.trim().length > 500) {
      showErrorToastHasTitle(
        "Lỗi",
        "Tên chứng chỉ không được vượt quá 500 ký tự"
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

    if (!formData.receivedDate) {
      showErrorToastHasTitle("Lỗi", "Vui lòng chọn ngày nhận chứng chỉ");
      return;
    }

    if (formData.receivedDate && formData.receivedDate > new Date()) {
      showErrorToastHasTitle(
        "Lỗi",
        "Ngày nhận chứng chỉ không được lớn hơn ngày hiện tại"
      );
      return;
    }

    const certificationData = {
      certificationId: editingCertification,
      name: formData.name.trim(),
      websiteUrl: formData.websiteUrl.trim(),
      description: formData.description.trim(),
      receivedDate: formData.receivedDate,
      images: formData.images,
    };

    addOrUpdateCertification(
      certificationData,
      (response) => {
        const newCertification = {
          id: response.id,
          name: formData.name.trim(),
          websiteUrl: formData.websiteUrl.trim(),
          description: formData.description.trim(),
          receivedDate: formData.receivedDate,
          images: formData.images,
        };

        let updatedCertifications;
        if (editingCertification) {
          updatedCertifications = certificationsData.map((cert) =>
            cert.id === editingCertification ? newCertification : cert
          );
        } else {
          updatedCertifications = [...certificationsData, newCertification];
        }

        setCertificationsData(updatedCertifications);
        defaultCertificationsData.current = [...updatedCertifications];

        showSuccessToastHasTitle(
          "Thành công",
          editingCertification
            ? "Cập nhật chứng chỉ thành công"
            : "Thêm chứng chỉ thành công"
        );
        handleCancel();

        setIsAddingNew(false);
        setEditingCertification(null);
        resetForm();
      },
      (error) => {
        console.log("Save error:", error);
        showErrorToastHasTitle(
          "Lỗi",
          error?.message || "Có lỗi xảy ra khi lưu thông tin chứng chỉ"
        );
      },
      (exception) => {
        console.error("Exception in handleSaveCertification:", exception);
        showErrorToastHasTitle("Lỗi", "Đã xảy ra lỗi không mong muốn");
      }
    );
  };

  const handleDeleteCertification = (certificationId) => {
    deleteCertification(
      certificationId,
      () => {
        const updatedCertifications = certificationsData.filter(
          (cert) => cert.id !== certificationId
        );
        setCertificationsData(updatedCertifications);
        defaultCertificationsData.current = [...updatedCertifications];

        showSuccessToastHasTitle("Thành công", "Xóa chứng chỉ thành công");
        handleCancel();
      },
      (error) => {
        if (error && error.message) {
          showErrorToastHasTitle("Lỗi", error.message);
        } else {
          showErrorToastHasTitle(
            "Lỗi",
            "Có lỗi xảy ra khi xóa thông tin chứng chỉ"
          );
        }
      },
      (exception) => {
        console.error("Exception in handleDeleteCertification:", exception);
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

  const openFilePicker = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
      inputFileRef.current.click();
    }
  };

  const renderCertificationForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Tên chứng chỉ *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Nhập tên chứng chỉ"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <Input
            value={formData.websiteUrl}
            onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Ngày nhận chứng chỉ *
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
                : "Chọn ngày nhận chứng chỉ"}
              <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <MyCalendar
              mode="single"
              selected={formData.receivedDate}
              onSelect={(date) => handleInputChange("receivedDate", date)}
              disabled={(date) => date > new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mô tả</label>
        <Textarea
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Mô tả về chứng chỉ..."
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Hình ảnh</label>
        <input
          type="file"
          ref={inputFileRef}
          style={{ display: "none" }}
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <div className="space-y-2">
          <button
            type="button"
            onClick={openFilePicker}
            className="px-4 py-2 border border-dashed borderrounded-md hover:bg-gray-50 transition-colors"
          >
            Chọn hình ảnh
          </button>
          {formData.images.length > 0 && (
            <div className="flex flex-wrap gap-5">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Certification ${index + 1}`}
                    className="w-40 h-40 object-cover rounded-md cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => handleImageClick(image)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-5 h-5 text-xs hover:accent transition-colors hover:cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card p-5 rounded-lg">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-xl font-medium">Chứng chỉ</h3>
          <div>
            {!isAddingNew && !editingCertification && isEnableEdit && (
              <IconAdd onClick={handleAddNew} className="size-8" />
            )}
          </div>
        </div>
        {isCanEdit && !isEnableEdit && <IconEdit onClick={handleEnableEdit} />}
      </div>

      <div className="border border-dashed w-full h-[1px]"></div>

      <div className="mt-5">
        {certificationsData.length === 0 && !isAddingNew ? (
          <p>Chưa có thông tin</p>
        ) : (
          <div className="space-y-4">
            {certificationsData.map((certification) => (
              <div key={certification.id} className="border rounded-lg p-4">
                {editingCertification === certification.id ? (
                  <div>
                    {renderCertificationForm()}
                    <div className="flex gap-2 justify-end mt-4">
                      <ButtonDestructive
                        content="Hủy"
                        onClick={() => {
                          setEditingCertification(null);
                          resetForm();
                        }}
                      />
                      <ButtonSuccess
                        content="Lưu"
                        onClick={handleSaveCertification}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                        <div className="flex gap-2 items-center">
                          <label className="text-foreground/70 text-sm">
                            Tên chứng chỉ:
                          </label>
                          <p className="text-foreground font-medium">
                            {certification.name}
                          </p>
                        </div>
                        {certification.receivedDate && (
                          <div className="flex gap-2 items-center">
                            <label className="text-foreground/70 text-sm">
                              Ngày nhận:
                            </label>
                            <p className="text-foreground">
                              {format(certification.receivedDate, "dd/MM/yyyy")}
                            </p>
                          </div>
                        )}
                        {certification.websiteUrl && (
                          <div className="flex gap-2 items-center">
                            <label className="text-foreground/70 text-sm">
                              Website:
                            </label>
                            <a
                              href={certification.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              <FaLink className="text-mlink" />
                            </a>
                          </div>
                        )}
                        {certification.description && (
                          <div className="md:col-span-2">
                            <label className="text-foreground/70 text-sm block mb-1">
                              Mô tả:
                            </label>
                            <p className="text-foreground whitespace-pre-wrap break-words min-w-0 flex-1">
                              {certification.description}
                            </p>
                          </div>
                        )}
                        {certification.images &&
                          certification.images.length > 0 && (
                            <div className="md:col-span-2">
                              <label className="text-foreground/70 text-sm block mb-2">
                                Hình ảnh:
                              </label>
                              <div className="flex flex-wrap gap-5">
                                {certification.images.map((image, index) => (
                                  <img
                                    key={index}
                                    src={image}
                                    alt={`${certification.name} ${index + 1}`}
                                    className="w-40 h-40 object-cover rounded-md cursor-pointer hover:opacity-75 transition-opacity"
                                    onClick={() => handleImageClick(image)}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                      </div>

                      {isEnableEdit && (
                        <div className="flex gap-2 ml-4">
                          <IconEdit onClick={() => handleEdit(certification)} />
                          <IconDelete
                            onClick={() =>
                              handleDeleteCertification(certification.id)
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
                <h4 className="font-medium mb-4">Thêm chứng chỉ mới</h4>
                {renderCertificationForm()}
                <div className="flex gap-2 justify-end mt-4">
                  <ButtonDestructive
                    content="Hủy"
                    onClick={() => {
                      setIsAddingNew(false);
                      resetForm();
                    }}
                  />
                  <ButtonSuccess
                    content="Lưu"
                    onClick={handleSaveCertification}
                  />
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
