import { useState } from "react";
import { IconEdit } from "@/components/my-components/icon/IconEdit";
import { IconAdd } from "@/components/my-components/icon/IconAdd";
import { IconDelete } from "@/components/my-components/icon/IconDelete";
import { ButtonSuccess } from "@/components/my-components/button/ButtonSuccess";
import { ButtonDestructive } from "@/components/my-components/button/ButtonDestructive";
import { Input } from "@/components/ui/input";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/MyToast";
import { updateGeneralInfos } from "@/pages/employer/company-profile/services/updateGeneralInfos";
export const GeneralInfo = ({
  generalInfo,
  classNameRow,
  isCanEdit,
  bg = "bg-background",
  padding = "p-5",
}) => {
  const defaultDataGeneralInfo = generalInfo.map((item) => ({
    ...item,
    id: crypto.randomUUID(),
  }));
  const [generalInfoData, setGeneralInfoData] = useState(
    defaultDataGeneralInfo
  );

  const [isEnableEdit, setIsEnableEdit] = useState(false);

  //btn
  const handleEnbleEdit = () => {
    if (isCanEdit) {
      setIsEnableEdit(!isEnableEdit);
    }
  };
  const handleHuy = () => {
    setIsEnableEdit(false);
    setGeneralInfoData(defaultDataGeneralInfo);
  };
  const handleLuu = () => {
    if (generalInfoData.length === 0) {
      console.log("vao day");
      showErrorToastHasTitle(
        "Thất bại",
        "Phải ít nhất một thông tin chung",
        "top-center"
      );
      return;
    }

    generalInfoData.map((item) => {
      console.log(item);
      if (item.title === "" || item.description === "") {
        showErrorToastHasTitle(
          "Thất bại",
          "Tiêu đề và mô tả không được để trống",
          "top-center"
        );
        return;
      }
    });

    const data = generalInfoData.map((item) => ({
      title: item.title,
      description: item.description,
    }));
    updateGeneralInfos(
      data,
      () => {
        showSuccessToastHasTitle(
          "Thành công",
          "Cập nhật thông tin chung",
          "top-center"
        );
        setIsEnableEdit(false);
      },
      (error) => {
        console.error("Error:", error);
        showErrorToastHasTitle("Thất bại", error.message, "top-center");
      },
      (exception) => {
        console.error("Exception in handleLuu:", exception);
        showErrorToastHasTitle(
          "Lỗi",
          "Đã xảy ra lỗi không mong muốn",
          "top-center"
        );
      }
    );
  };
  const handleAdd = () => {
    const newItem = {
      id: crypto.randomUUID(),
      title: "Tiêu đề mới",
      description: "Mô tả mới",
    };
    setGeneralInfoData([...generalInfoData, newItem]);
  };

  const handleDeleteItem = (id) => () => {
    const dataCur = [...generalInfoData];
    const dataNew = [];
    dataCur.map((item) => {
      if (item.id !== id) {
        dataNew.push(item);
      }
    });
    setGeneralInfoData(dataNew);
  };

  const handleInputChange = (id, field, value) => {
    const updatedData = generalInfoData.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setGeneralInfoData(updatedData);
  };

  return (
    <>
      <div className={`${bg} ${padding} rounded-lg`}>
        <div className="flex justify-between">
          <div className="flex gap-2 justify-center hover:cursor-pointer">
            <h3 className="text-xl font-medium mb-1">Thông tin chung</h3>
            {isEnableEdit && (
              <>
                <IconAdd onClick={handleAdd}></IconAdd>
              </>
            )}
          </div>
          {isCanEdit && !isEnableEdit && (
            <>
              <IconEdit onClick={handleEnbleEdit}></IconEdit>
            </>
          )}
        </div>
        {/* line */}
        <div className="border border-dashed w-full h-[1px]"></div>
        {/* content */}
        <div className="px-4 mt-1 flex flex-wrap">
          {generalInfoData.map((item) => (
            <div key={item.id} className={classNameRow}>
              <div className="flex">
                <div>
                  {isEnableEdit ? (
                    <>
                      <Input
                        className="text-sm text-foreground/50 mb-1"
                        value={item.title}
                        onChange={(e) =>
                          handleInputChange(item.id, "title", e.target.value)
                        }
                      ></Input>
                      <Input
                        value={item.description}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            "description",
                            e.target.value
                          )
                        }
                      ></Input>
                    </>
                  ) : (
                    <>
                      <h4 className="text-sm text-foreground/50">
                        {item.title}
                      </h4>
                      <p>{item.description}</p>
                    </>
                  )}
                </div>
                {isEnableEdit && (
                  <IconDelete
                    className="!size-5 ml-1"
                    onClick={handleDeleteItem(item.id)}
                  ></IconDelete>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* btn */}
        {isEnableEdit && (
          <div className="mt-5 flex justify-end gap-5">
            <ButtonDestructive
              content="Hủy"
              onClick={handleHuy}
            ></ButtonDestructive>
            <ButtonSuccess content="Lưu" onClick={handleLuu}></ButtonSuccess>
          </div>
        )}
      </div>
    </>
  );
};
