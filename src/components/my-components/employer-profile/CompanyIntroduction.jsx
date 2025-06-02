import { IconEdit } from "@/components/my-components/icon/IconEdit";
import { useState, useEffect } from "react";
import { sanitizeHtml } from "@/utils/sanitizeHtmlUtils";

export const CompanyIntroduction = ({
  companyIntroduction,
  handleEdit,
  isEnabledEdit,
  isCanEdit,
  ...props
}) => {
  const [processedContent, setProcessedContent] = useState("");

  useEffect(() => {
    if (companyIntroduction) {
      setProcessedContent(sanitizeHtml(companyIntroduction));
    }
  }, [companyIntroduction]);

  return (
    <>
      <div className="bg-background p-5 rounded-lg">
        <div className="flex justify-between">
          <h3 className="text-xl font-medium mb-3">Giới thiệu công ty</h3>
          {isCanEdit && !isEnabledEdit && (
            <IconEdit onClick={handleEdit}></IconEdit>
          )}
        </div>
        <div className="border border-dashed w-full h-[1px]"></div>
        <div
          className="mt-5 tinymce-content"
          dangerouslySetInnerHTML={{
            __html: processedContent || companyIntroduction,
          }}
        />
      </div>
    </>
  );
};
