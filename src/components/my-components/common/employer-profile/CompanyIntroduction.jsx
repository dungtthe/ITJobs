import { IconEdit } from "@/components/my-components/common/icon/IconEdit";
import { useState } from "react";
export const CompanyIntroduction = ({
  companyIntroduction,
  handleEdit,
  isEnabledEdit,
  isCanEdit,
  ...props
}) => {
  return (
    <>
      <div className="bg-background p-5 rounded-lg">
        <div className="flex justify-between">
          <h3 className="text-xl font-medium mb-3">Giới thiệu công ty</h3>
          {isCanEdit && !isEnabledEdit && (
            <IconEdit onClick={handleEdit}></IconEdit>
          )}
        </div>
        {/* line */}
        <div className="border border-dashed w-full h-[1px]"></div>
        {/* content */}
        <div
          className="mt-5 tinymce-content"
          dangerouslySetInnerHTML={{ __html: companyIntroduction }}
        />
      </div>
    </>
  );
};
