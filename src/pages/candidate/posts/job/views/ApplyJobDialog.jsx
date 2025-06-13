import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getCVs } from "../services/getCVs";
import { applyJob } from "../services/applyJob";
import { PiReadCvLogo } from "react-icons/pi";
import { IconEye } from "@/components/my-components/icon/IconEye";
import { viewCVFile } from "@/pages/candidate/profile/services/viewCV";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/MyToast";
import { ExternalLink } from "lucide-react";

export const ApplyJobDialog = ({ postId, children, onApplySuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cvs, setCvs] = useState([]);
  const [selectedCVLink, setSelectedCVLink] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      getCVs(
        (data) => {
          setCvs(data.items);
          setIsLoading(false);
        },
        (error) => {
          showErrorToastHasTitle(
            "Lỗi",
            error.message || "Không thể tải danh sách CV"
          );
          setIsLoading(false);
        },
        (exception) => {
          showErrorToastHasTitle("Lỗi hệ thống", "Vui lòng thử lại sau");
          setIsLoading(false);
          console.error(exception);
        }
      );
    }
  }, [isOpen]);

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
        showErrorToastHasTitle("Lỗi hệ thống", "Vui lòng thử lại sau");
        console.error(exception);
      }
    );
  };

  const handleSubmit = () => {
    if (!selectedCVLink) {
      showErrorToastHasTitle("Lỗi", "Vui lòng chọn CV để ứng tuyển");
      return;
    }

    if (!coverLetter.trim()) {
      showErrorToastHasTitle("Lỗi", "Vui lòng nhập thư giới thiệu bản thân");
      return;
    }

    if (coverLetter.length > 2000) {
      showErrorToastHasTitle(
        "Lỗi",
        "Thư giới thiệu bản thân không được quá 2000 kí tự"
      );
      return;
    }

    setIsSubmitting(true);

    const applicationData = {
      postId: postId,
      cVLink: selectedCVLink,
      coverLetter: coverLetter.trim(),
    };

    console.log("Application data:", applicationData);
    applyJob(
      applicationData,
      (data) => {
        showSuccessToastHasTitle(
          "Thành công",
          "Đã nộp đơn ứng tuyển thành công!"
        );
        setIsOpen(false);
        setSelectedCVLink("");
        setCoverLetter("");
        setIsSubmitting(false);
        if (onApplySuccess) {
          onApplySuccess();
        }
      },
      (error) => {
        console.log("Error: " + error);
        showErrorToastHasTitle(
          "Lỗi",
          error.message || "Không thể nộp đơn ứng tuyển"
        );
        setIsSubmitting(false);
      },
      (exception) => {
        showErrorToastHasTitle("Lỗi hệ thống", "Vui lòng thử lại sau");
        setIsSubmitting(false);
        console.error(exception);
      }
    );
  };

  const handleOpenProfile = () => {
    window.open("/profile", "_blank");
  };

  return (
    <div className="user-theme">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ứng tuyển vị trí</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* CV Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-base font-medium">Chọn CV của bạn</label>
                <Button
                  size="sm"
                  onClick={handleOpenProfile}
                  className="flex items-center gap-2 hover:cursor-pointer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Thêm CV khác
                </Button>
              </div>

              {isLoading ? (
                <div className="text-center py-4">Đang tải danh sách CV...</div>
              ) : cvs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <PiReadCvLogo className="mx-auto h-12 w-12 mb-2 " />
                  <p>Bạn chưa có CV nào</p>
                  {/* <Button className="mt-2" onClick={handleOpenProfile}>
                    Thêm CV ngay
                  </Button> */}
                </div>
              ) : (
                <div className="space-y-2">
                  {cvs.map((cv) => (
                    <div
                      key={cv.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50"
                    >
                      <input
                        type="radio"
                        value={cv.fileName}
                        id={cv.id}
                        name="selectedCV"
                        checked={selectedCVLink === cv.fileName}
                        onChange={(e) => setSelectedCVLink(e.target.value)}
                        className="w-4 h-4"
                      />
                      <PiReadCvLogo className="h-6 w-6 text-primary" />
                      <div className="flex-1">
                        <label
                          htmlFor={cv.id}
                          className="cursor-pointer font-medium"
                        >
                          {cv.originalFileName}
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Ngày tải lên:{" "}
                          {new Date(cv.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewCV(cv.fileName)}
                        className="text-success hover:text-success/80 hover:cursor-pointer"
                      >
                        <IconEye className="size-7  " />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cover Letter */}
            <div>
              <label htmlFor="coverLetter" className="text-base font-medium">
                Thư giới thiệu bản thân *
              </label>
              <textarea
                id="coverLetter"
                placeholder="Viết một thư giới thiệu ngắn gọn về bản thân bạn..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="mt-2 min-h-[120px] w-full p-3 border  rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-red-500/60"
                maxLength={1000}
              />
              <p className="text-sm text-muted-foreground mt-1">
                {coverLetter.length}/2000 ký tự
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Hủy
              </Button>
              <Button
                className="hover:cursor-pointer"
                onClick={handleSubmit}
                disabled={
                  isSubmitting || !selectedCVLink || !coverLetter.trim()
                }
              >
                {isSubmitting ? "Đang nộp đơn..." : "Nộp đơn ứng tuyển"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
