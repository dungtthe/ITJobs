import React, { useState, useRef } from "react";
import { CompanyLogo } from "@/components/my-components/common/employer-profile/CompanyLogo";
import { IconEdit } from "@/components/my-components/common/icon/IconEdit";
import { ButtonSuccess } from "@/components/my-components/common/button/ButtonSuccess";
import { ButtonDestructive } from "@/components/my-components/common/button/ButtonDestructive";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/common/MyToast";
import { formatVND } from "@/utils/formatUtils";
import { IconLink } from "@/components/my-components/common/icon/IconLink";
import { convertImageToBase64 } from "@/utils/imageUtils";
import { updateImage } from "@/services/accounts/updateImage";
import { useUserStore } from "@/stores/authStore";
import { Input } from "@/components/ui/input";
import { updateOverView } from "@/features/employer/company-profile/usecases/commands/updateOverView";
export const OverviewInformation = ({
  image,
  email,
  phoneNumber,
  accountBalance,
  companyName,
  websiteUrl,
  companyType,
  isCanEdit,
}) => {
  //store
  const setUserStore = useUserStore((state) => state.setUser);
  const userStore = useUserStore((state) => state.user);

  //default data
  const defaultDataImage = useRef(image);
  const defaultDataPhoneNumber = useRef(
    phoneNumber === null ? "Chưa có" : phoneNumber
  );
  const defaultDataCompanyName = useRef(companyName);
  const defaultDataWebsiteUrl = useRef(
    websiteUrl === null ? "Chưa có" : websiteUrl
  );
  const defaultDataCompanyType = useRef(
    companyType === null ? "Chưa có" : companyType
  );

  const [imageData, setImageData] = useState(image);
  const [isEnableEditLogo, setIsEnableEditLogo] = useState(false);
  const [isEnableEditOverview, setIsEnableEditOverview] = useState(false);

  //ref
  const inputFileRef = useRef(null);
  const inputPhoneNumberRef = useRef(null);
  const inputCompanyNameRef = useRef(null);
  const inputWebsiteUrlRef = useRef(null);
  const inputCompanyTypeRef = useRef(null);

  //logo
  const handleEnableEditLogo = () => {
    setIsEnableEditLogo(true);
    openFilePicker();
  };
  const openFilePicker = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
      inputFileRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (!file.type.match("image.*")) {
      showErrorToastHasTitle("Lỗi", "Vui lòng chọn file hình ảnh");
      return;
    }

    try {
      var imgBase64 = await convertImageToBase64(file);
      console.log("base64, length:", imgBase64.length);
      setImageData(imgBase64);
    } catch (error) {
      console.error("Error convert image:", error);
      showErrorToastHasTitle("Lỗi", "Không thể xử lý hình ảnh này");
    }
  };

  const handleHuyEditLogo = () => {
    setIsEnableEditLogo(false);
    setImageData(defaultDataImage.current);
  };

  const handleLuuEditLogo = () => {
    console.log(imageData);
    if (imageData === defaultDataImage.current) {
      setIsEnableEditLogo(false);
      return;
    }
    updateImage(
      imageData,
      () => {
        setIsEnableEditLogo(false);
        defaultDataImage.current = imageData;
        setImageData(imageData);
        showSuccessToastHasTitle("Thành công", "Cập nhật logo thành công");
        setUserStore({ name: userStore.name, image: imageData });
      },
      (fail) => {
        showErrorToastHasTitle("Lỗi", "Cập nhật logo thất bại");
      },
      (ex) => {
        showErrorToastHasTitle("Lỗi", "Có lỗi xảy ra khi cập nhật logo");
      }
    );
  };

  //overview
  const handleEnableEditOverview = () => {
    setIsEnableEditOverview(true);
  };
  const handleHuyEditOverview = () => {
    setIsEnableEditOverview(false);
  };
  const handleLuuEditOverview = () => {
    const phoneNumber = inputPhoneNumberRef.current.value;
    const companyName = inputCompanyNameRef.current.value;
    const websiteUrl = inputWebsiteUrlRef.current.value;
    const companyType = inputCompanyTypeRef.current.value;
    if (
      phoneNumber === defaultDataPhoneNumber.current &&
      companyName === defaultDataCompanyName.current &&
      websiteUrl === defaultDataWebsiteUrl.current &&
      companyType === defaultDataCompanyType.current
    ) {
      setIsEnableEditOverview(false);
      return;
    }

    const data = {
      phoneNumber: phoneNumber,
      companyName: companyName,
      websiteUrl: websiteUrl,
      companyType: companyType,
    };
    updateOverView(
      data,
      () => {
        setIsEnableEditOverview(false);
        defaultDataPhoneNumber.current = phoneNumber;
        defaultDataCompanyName.current = companyName;
        defaultDataWebsiteUrl.current = websiteUrl;
        defaultDataCompanyType.current = companyType;
        showSuccessToastHasTitle(
          "Thành công",
          "Cập nhật thông tin thành công",
          "top-center"
        );
        setUserStore({
          name: defaultDataCompanyName.current,
          image: userStore.image,
        });
      },
      (fail) => {
        showErrorToastHasTitle("Lỗi", fail.message, "top-center");
      },
      (ex) => {
        showErrorToastHasTitle(
          "Lỗi",
          "Có lỗi xảy ra khi cập nhật thông tin",
          "top-center"
        );
      }
    );
  };
  return (
    <>
      <div className="bg-background p-5 rounded-lg">
        <div className="flex justify-between">
          <div className="flex gap-2 justify-center hover:cursor-pointer">
            <h3 className="text-xl font-medium mb-3">Tổng quan</h3>
          </div>
        </div>
        {/* line */}
        <div className="border border-dashed w-full h-[1px]"></div>
        {/* content */}
        <div className="px-4 mt-5 flex">
          {/* logo */}
          <div className="flex gap-2 border-r pr-30">
            <CompanyLogo image={imageData}></CompanyLogo>
            {isCanEdit}
            {
              //   nếu để trong thằng {isCanEdit && !isEnableEditLogo là khi render lại ô input này mất nên filechange k được gọi
              <input
                type="file"
                ref={inputFileRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
            }
            <div className="flex flex-col justify-between">
              {isCanEdit && !isEnableEditLogo && (
                <>
                  <IconEdit onClick={handleEnableEditLogo}></IconEdit>
                </>
              )}
              {isEnableEditLogo && (
                <div className="flex flex-col justify-end h-[300px] gap-5">
                  <ButtonDestructive
                    content="Hủy"
                    onClick={handleHuyEditLogo}
                  ></ButtonDestructive>
                  <ButtonSuccess
                    content="Lưu"
                    onClick={handleLuuEditLogo}
                  ></ButtonSuccess>
                </div>
              )}
            </div>
          </div>

          {/* description */}
          <div className="ml-10 flex">
            <div className="ml-10 flex flex-col gap-3">
              <div className=" flex gap-2">
                <label className="text-foreground/70">Email:</label>
                <p>{email}</p>
              </div>

              <div className=" flex gap-2">
                <label className="text-foreground/70">Số điện thoại:</label>
                {isEnableEditOverview ? (
                  <>
                    <Input
                      defaultValue={defaultDataPhoneNumber.current}
                      ref={inputPhoneNumberRef}
                    ></Input>
                  </>
                ) : (
                  <>
                    <p>
                      {defaultDataPhoneNumber.current === null
                        ? "Chưa có"
                        : defaultDataPhoneNumber.current}
                    </p>
                  </>
                )}
              </div>

              <div className=" flex gap-2">
                <label className="text-foreground/70">Số dư tài khoản:</label>
                <p>{formatVND(accountBalance)}</p>
              </div>

              {/* chua lam socialmedialink */}
              <div className=" flex gap-2">
                <label className="text-foreground/70">Tên công ty:</label>
                {isEnableEditOverview ? (
                  <>
                    <Input
                      defaultValue={defaultDataCompanyName.current}
                      ref={inputCompanyNameRef}
                    ></Input>
                  </>
                ) : (
                  <>
                    <p>
                      {defaultDataCompanyName.current === null
                        ? "Chưa có"
                        : defaultDataCompanyName.current}
                    </p>
                  </>
                )}
              </div>

              <div className=" flex gap-2">
                <label className="text-foreground/70">Loại hình công ty:</label>
                {isEnableEditOverview ? (
                  <>
                    <Input
                      defaultValue={defaultDataCompanyType.current}
                      ref={inputCompanyTypeRef}
                    ></Input>
                  </>
                ) : (
                  <>
                    <p>
                      {defaultDataCompanyType.current === null
                        ? "Chưa có"
                        : defaultDataCompanyType.current}
                    </p>
                  </>
                )}
              </div>

              <div className=" flex gap-2">
                <label className="text-foreground/70">Website công ty:</label>
                {isEnableEditOverview ? (
                  <>
                    <Input
                      defaultValue={defaultDataWebsiteUrl.current}
                      ref={inputWebsiteUrlRef}
                    ></Input>
                  </>
                ) : (
                  <>
                    <p>
                      {defaultDataWebsiteUrl.current === null ? (
                        "Chưa có"
                      ) : (
                        <>
                          <IconLink
                            link={defaultDataWebsiteUrl.current}
                          ></IconLink>
                        </>
                      )}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* edit, huy va luu */}
            <div className="mt-1 ml-5">
              {isCanEdit && !isEnableEditOverview && (
                <IconEdit onClick={handleEnableEditOverview}></IconEdit>
              )}
              {isEnableEditOverview && (
                <div className="flex flex-col justify-end h-[300px] gap-5">
                  <ButtonDestructive
                    content="Hủy"
                    onClick={handleHuyEditOverview}
                  ></ButtonDestructive>
                  <ButtonSuccess
                    content="Lưu"
                    onClick={handleLuuEditOverview}
                  ></ButtonSuccess>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
