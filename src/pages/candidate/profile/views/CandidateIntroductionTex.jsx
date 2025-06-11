import { useState, useRef } from "react";
import { TextEditor } from "@/components/my-components/text-editor/TextEditor";
import { CandidateIntroduction } from "@/components/my-components/candidate/profile/CandidateIntroduction";
import { updateAboutme } from "@/pages/candidate/profile/services/updateAboutme";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/MyToast";

export const CandidateIntroductionTex = ({ candidateIntroduction }) => {
  const defaultCandidateIntroduction = useRef(candidateIntroduction);

  const [isEnabledEdit, setIsEnabledEdit] = useState(false);
  const [introduction, setIntroduction] = useState(candidateIntroduction || "");

  const handleSaveIntroduction = (content) => {
    console.log("content:", content);
    updateAboutme(
      content,
      (sus) => {
        showSuccessToastHasTitle(
          "Thành công",
          "Cập nhật thông tin giới thiệu bản thân thành công"
        );
        setIsEnabledEdit(false);
        setIntroduction(sus.aboutMe);
        defaultCandidateIntroduction.current = sus.aboutMe;
      },
      (error) => {
        console.error("Error:", error);
        showErrorToastHasTitle("Thất bại", error.message);
        setIsEnabledEdit(false);
        setIntroduction(defaultCandidateIntroduction.current);
      },
      (exception) => {
        console.error("Exception in handleSave:", exception);
        showErrorToastHasTitle("Lỗi", "Đã xảy ra lỗi không mong muốn");
        setIsEnabledEdit(false);
        setIntroduction(defaultCandidateIntroduction.current);
      }
    );
  };

  const handleEdit = () => {
    setIsEnabledEdit(!isEnabledEdit);
  };

  const handleHuy = () => {
    setIsEnabledEdit(false);
    setIntroduction(defaultCandidateIntroduction.current);
  };

  return (
    <>
      <CandidateIntroduction
        candidateIntroduction={defaultCandidateIntroduction.current}
        handleEdit={handleEdit}
        isEnabledEdit={isEnabledEdit}
        isCanEdit={true}
      />

      {isEnabledEdit && (
        <div className="bg-background py-5 rounded-lg">
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
