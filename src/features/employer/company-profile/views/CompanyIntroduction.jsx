import { useState } from "react";
import { TextEditor } from "@/components/my-components/common/text-editor/TextEditor";

export const CompanyIntroduction = ({ companyIntroduction }) => {
  const [introduction, setIntroduction] = useState(companyIntroduction || "");

  const handleSaveIntroduction = (content) => {
    setIntroduction(content);

    // Ở đây bạn có thể gọi API để lưu nội dung vào database
    // Ví dụ:
    // saveCompanyIntroductionAPI(content)
    //   .then(() => {
    //     // Hiển thị thông báo thành công
    //   })
    //   .catch(error => {
    //     // Xử lý lỗi
    //   });

    console.log("Đã lưu nội dung:", content);
    // Hiển thị thông báo đã lưu thành công
    alert("Đã lưu nội dung giới thiệu công ty!");
  };

  return (
    <div className="bg-background p-5 rounded-lg">
      <TextEditor
        height={700}
        initialValue={introduction}
        onSave={handleSaveIntroduction}
      />
    </div>
  );
};
