import { useState, useRef } from "react";
import { TextEditor } from "@/components/my-components/text-editor/TextEditor";
import { CompanyIntroduction } from "@/components/my-components/employer-profile/CompanyIntroduction";
import { updateCompanyIntroduction } from "@/pages/employer/company-profile/services/updateCompanyIntroduction";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/MyToast";

export const CompanyIntroductionTex = ({ companyIntroduction }) => {
  const defaultCompanyIntroduction = useRef(companyIntroduction);

  const [isEnabledEdit, setIsEnabledEdit] = useState(false);
  const [introduction, setIntroduction] = useState(companyIntroduction || "");
  const handleSaveIntroduction = (content) => {
    console.log("content:", content);
    updateCompanyIntroduction(
      content,
      (sus) => {
        showSuccessToastHasTitle(
          "Thành công",
          "Cập nhật thông tin gioi thiệu công ty thành công",
          "top-center"
        );
        setIsEnabledEdit(false);
        setIntroduction(sus.companyIntroduction);
        defaultCompanyIntroduction.current = sus.companyIntroduction;
      },
      (error) => {
        console.error("Error:", error);
        showErrorToastHasTitle("Thất bại", error.message, "top-center");
        setIsEnabledEdit(false);
        setIntroduction(defaultCompanyIntroduction.current);
      },
      (exception) => {
        console.error("Exception in handleLuu:", exception);
        showErrorToastHasTitle(
          "Lỗi",
          "Đã xảy ra lỗi không mong muốn",
          "top-center"
        );
        setIsEnabledEdit(false);
        setIntroduction(defaultCompanyIntroduction.current);
      }
    );
  };

  const handleEdit = () => {
    setIsEnabledEdit(!isEnabledEdit);
  };
  const handleHuy = () => {
    setIsEnabledEdit(false);
    setIntroduction(defaultCompanyIntroduction.current);
  };
  return (
    <>
      <CompanyIntroduction
        companyIntroduction={defaultCompanyIntroduction.current}
        handleEdit={handleEdit}
        isEnabledEdit={isEnabledEdit}
        isCanEdit={true}
      ></CompanyIntroduction>

      {isEnabledEdit && (
        <div className="bg-background p-5 rounded-lg">
          <TextEditor
            height={700}
            initialValue={introduction}
            onSave={handleSaveIntroduction}
            handleHuy={handleHuy}
          />
        </div>
      )}
    </>
  );
};
