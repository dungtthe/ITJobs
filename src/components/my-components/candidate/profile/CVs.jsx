import { IconEdit } from "@/components/my-components/icon/IconEdit";
import { useState, useEffect, useRef } from "react";
import { ButtonSuccess } from "../../button/ButtonSuccess";
import { ButtonDestructive } from "../../button/ButtonDestructive";
import { uploadCVs } from "@/pages/candidate/profile/services/uploadCVs";
import { viewCVFile } from "@/pages/candidate/profile/services/viewCV";
import { PiReadCvLogo } from "react-icons/pi";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/MyToast";
import { IconEye } from "../../icon/IconEye";
import { IconDelete } from "../../icon/IconDelete";
import { deleteCV } from "@/pages/candidate/profile/services/deleteCV";
export const CVs = ({ cvLinks, isCanEdit = false }) => {
  const [isEnableEdit, setIsEnableEdit] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [displayedCVs, setDisplayedCVs] = useState(cvLinks);
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (cvLinks && Array.isArray(cvLinks)) {
      setDisplayedCVs(cvLinks);
    }
  }, [cvLinks]);
  const handleEnableEdit = () => {
    setIsEnableEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEnableEdit(false);
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length < files.length) {
      showErrorToastHasTitle(
        "Lỗi định dạng file",
        "Chỉ hỗ trợ upload file PDF"
      );
    }

    setSelectedFiles(pdfFiles);
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      showErrorToastHasTitle("Lỗi", "Vui lòng chọn ít nhất một CV để upload");
      return;
    }

    setIsUploading(true);

    uploadCVs(
      selectedFiles,
      (data) => {
        setIsEnableEdit(false);
        setSelectedFiles([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        showSuccessToastHasTitle("Thành công", "CV đã được upload thành công");
        console.log(data);
        const newCVs = [...displayedCVs, ...data];
        setDisplayedCVs(newCVs);
      },
      (error) => {
        showErrorToastHasTitle(
          "Đã xảy ra lỗi khi upload CV",
          error.message || "Lỗi không xác định"
        );
      },
      (exception) => {
        console.error(exception);
        showErrorToastHasTitle(
          "Lỗi hệ thống",
          "Đã xảy ra lỗi, vui lòng thử lại sau"
        );
      }
    );

    setIsUploading(false);
  };

  const handleViewCV = (fileName) => {
    viewCVFile(
      fileName,
      (url) => {
        window.open(url, "_blank");
      },
      (error) => {
        showErrorToastHasTitle(
          "Lỗi khi xem CV",
          error.message || "Không thể tải CV"
        );
      },
      (exception) => {
        showErrorToastHasTitle(
          "Lỗi hệ thống",
          "Đã xảy ra lỗi, vui lòng thử lại sau"
        );
        console.error(exception);
      }
    );
  };

  const handleDeleteCV = (cvId) => {
    deleteCV(
      cvId,
      () => {
        showSuccessToastHasTitle("Thành công", "CV đã được xóa thành công");
        const newCVs = [];
        displayedCVs.forEach((item) => {
          if (item.id !== cvId) {
            newCVs.push(item);
          }
        });
        setDisplayedCVs(newCVs);
      },
      () => {
        showErrorToastHasTitle("Lỗi", "Có lỗi khi xóa CV, vui lòng thử lại");
      },
      () => {
        showErrorToastHasTitle("Lỗi", "Có lỗi khi xóa CV, vui lòng thử lại");
      }
    );
  };

  return (
    <div className="bg-card p-5 rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium mb-3">Thông tin CV</h3>
        {isCanEdit && !isEnableEdit && (
          <IconEdit onClick={handleEnableEdit}></IconEdit>
        )}
      </div>
      <div className="border border-dashed w-full h-[1px]"></div>

      <div className="mt-5">
        {isEnableEdit ? (
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="cv-upload" className="font-medium">
                Upload CV (PDF)
              </label>
              <input
                ref={fileInputRef}
                id="cv-upload"
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileChange}
                className="border rounded p-2"
              />
              {selectedFiles.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium">Các file đã chọn:</p>
                  <ul className="list-disc list-inside">
                    {selectedFiles.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <ButtonSuccess
                content="Lưu"
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? "Đang upload..." : "Upload CV"}
              </ButtonSuccess>
              <ButtonDestructive content="Hủy" onClick={handleCancelEdit}>
                Hủy
              </ButtonDestructive>
            </div>
          </div>
        ) : (
          <div>
            {displayedCVs.length === 0 ? (
              <p>Chưa có thông tin</p>
            ) : (
              <div className="space-y-2">
                {displayedCVs.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-2 border rounded hover:accent-accent"
                  >
                    <div className="flex items-center space-x-2">
                      <PiReadCvLogo className="sm-7 text-accent"></PiReadCvLogo>
                      <span>{item.originalFileName}</span>
                    </div>

                    <div>
                      <div className="flex gap-5">
                        <IconEye
                          className="text-success bg-transparent size-8"
                          onClick={() => handleViewCV(item.fileName)}
                        ></IconEye>
                        {isCanEdit && (
                          <div>
                            <IconDelete
                              className="size-6"
                              onClick={() => handleDeleteCV(item.id)}
                            ></IconDelete>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
