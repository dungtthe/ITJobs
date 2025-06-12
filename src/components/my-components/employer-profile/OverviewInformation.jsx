import React, { useState, useRef, useEffect } from "react";
import { CompanyLogo } from "@/components/my-components/employer-profile/CompanyLogo";
import { IconEdit } from "@/components/my-components/icon/IconEdit";
import { ButtonSuccess } from "@/components/my-components/button/ButtonSuccess";
import { ButtonDestructive } from "@/components/my-components/button/ButtonDestructive";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/MyToast";
import { formatVND } from "@/utils/formatUtils";
import { IconLink } from "@/components/my-components/icon/IconLink";
import { convertImageToBase64 } from "@/utils/imageUtils";
import { updateImage } from "@/shared-services/accounts/updateImage";
import { useUserStore } from "@/stores/authStore";
import { Input } from "@/components/ui/input";
import { updateOverView } from "@/pages/employer/company-profile/services/updateOverView";
import { getCompanyTypes } from "@/shared-services/search-filters/getCompanyTypes";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const companyTypesSystemDataRef = useRef([]);
  useEffect(() => {
    getCompanyTypes(
      (sus) => {
        companyTypesSystemDataRef.current = sus.map((item) => ({
          value: item,
          label: item,
        }));
        console.log(companyTypesSystemDataRef.current);
      },
      () => {
        companyTypesSystemDataRef.current = [];
      },
      () => {
        companyTypesSystemDataRef.current = [];
      }
    );
  }, []);

  //default data - store actual values without "Chưa có"
  const defaultDataImage = useRef(image);
  const defaultDataPhoneNumber = useRef(phoneNumber);
  const defaultDataCompanyName = useRef(companyName);
  const defaultDataWebsiteUrl = useRef(websiteUrl);
  const defaultDataCompanyType = useRef(companyType);

  const [imageData, setImageData] = useState(image);
  const [isEnableEditLogo, setIsEnableEditLogo] = useState(false);
  const [isEnableEditOverview, setIsEnableEditOverview] = useState(false);

  //state
  const [openCompanyTypeCombobox, setOpenCompanyTypeCombobox] = useState(false);
  const [companyTypeValue, setCompanyTypeValue] = useState(companyType || "");
  const [companyTypeInputValue, setCompanyTypeInputValue] = useState("");

  //ref
  const inputFileRef = useRef(null);
  const inputPhoneNumberRef = useRef(null);
  const inputCompanyNameRef = useRef(null);
  const inputWebsiteUrlRef = useRef(null);

  const handleSelectCompanyType = (currentValue) => {
    setCompanyTypeValue(currentValue);
    setCompanyTypeInputValue("");
    setOpenCompanyTypeCombobox(false);
  };

  const handleAddCustomCompanyType = () => {
    const trimmedValue = companyTypeInputValue.trim();

    if (!trimmedValue) {
      showErrorToastHasTitle("Lỗi", "Tên loại công ty không được để trống");
      return;
    }

    setCompanyTypeValue(trimmedValue);
    setCompanyTypeInputValue("");
    setOpenCompanyTypeCombobox(false);
  };

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
    setCompanyTypeValue(defaultDataCompanyType.current || "");
  };

  const handleHuyEditOverview = () => {
    setIsEnableEditOverview(false);
    setCompanyTypeValue(defaultDataCompanyType.current || "");
  };

  const handleLuuEditOverview = () => {
    const phoneNumber = inputPhoneNumberRef.current.value;
    const companyName = inputCompanyNameRef.current.value;
    const websiteUrl = inputWebsiteUrlRef.current.value;
    const companyType = companyTypeValue;

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
        showSuccessToastHasTitle("Thành công", "Cập nhật thông tin thành công");
        setUserStore({
          name: defaultDataCompanyName.current,
          image: userStore.image,
        });
      },
      (fail) => {
        showErrorToastHasTitle("Lỗi", fail.message);
      },
      (ex) => {
        showErrorToastHasTitle("Lỗi", "Có lỗi xảy ra khi cập nhật thông tin");
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
          <div className="flex gap-2 border-r pr-10 ">
            <CompanyLogo
              image={imageData}
              maxWidth="350px"
              maxHeight="350px"
            ></CompanyLogo>
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
              <div className=" flex  items-center">
                <label className="text-foreground/70 min-w-[140px] text-sm">
                  Email:
                </label>
                <p className="text-base">{email}</p>
              </div>

              <div className=" flex items-center">
                <label className="text-foreground/70 min-w-[140px] text-sm">
                  Số điện thoại:
                </label>
                {isEnableEditOverview ? (
                  <>
                    <Input
                      defaultValue={defaultDataPhoneNumber.current || ""}
                      ref={inputPhoneNumberRef}
                      placeholder="Nhập số điện thoại"
                    ></Input>
                  </>
                ) : (
                  <>
                    <p className="text-base">
                      {defaultDataPhoneNumber.current
                        ? defaultDataPhoneNumber.current
                        : "Chưa có"}
                    </p>
                  </>
                )}
              </div>

              <div className=" flex items-center text-sm">
                <label className="text-foreground/70 min-w-[140px] text-sm">
                  Số dư tài khoản:
                </label>
                <p className="text-base">{formatVND(accountBalance)}</p>
              </div>

              {/* chua lam socialmedialink */}
              <div className=" flex items-center ">
                <label className="text-foreground/70 min-w-[140px] text-sm">
                  Tên công ty:
                </label>
                {isEnableEditOverview ? (
                  <>
                    <Input
                      defaultValue={defaultDataCompanyName.current || ""}
                      ref={inputCompanyNameRef}
                      placeholder="Nhập tên công ty"
                    ></Input>
                  </>
                ) : (
                  <>
                    <p className="text-base">
                      {defaultDataCompanyName.current
                        ? defaultDataCompanyName.current
                        : "Chưa có"}
                    </p>
                  </>
                )}
              </div>

              <div className=" flex items-center">
                <label className="text-foreground/70 min-w-[140px] text-sm">
                  Loại hình công ty:
                </label>
                {isEnableEditOverview ? (
                  <>
                    <Popover
                      open={openCompanyTypeCombobox}
                      onOpenChange={setOpenCompanyTypeCombobox}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCompanyTypeCombobox}
                          className="w-fit justify-between text-sm text-foreground/90"
                        >
                          {companyTypeValue || "Chọn loại công ty..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Tìm loại công ty..."
                            className="h-9"
                            value={companyTypeInputValue}
                            onValueChange={setCompanyTypeInputValue}
                          />
                          <CommandList>
                            <CommandEmpty>
                              <div className="p-2">
                                <p className="text-sm text-muted-foreground mb-2">
                                  Không tìm thấy loại công ty
                                </p>
                                {companyTypeInputValue.trim() && (
                                  <Button
                                    size="sm"
                                    onClick={handleAddCustomCompanyType}
                                    className="w-full"
                                  >
                                    Thêm "{companyTypeInputValue.trim()}"
                                  </Button>
                                )}
                              </div>
                            </CommandEmpty>
                            <CommandGroup>
                              {companyTypesSystemDataRef.current
                                ?.filter((item) =>
                                  item.label
                                    .toLowerCase()
                                    .includes(
                                      companyTypeInputValue.toLowerCase()
                                    )
                                )
                                .map((item) => (
                                  <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={handleSelectCompanyType}
                                    className="text-base "
                                  >
                                    {item.label}
                                    <Check
                                      className={cn(
                                        "ml-auto h-4 w-4 ",
                                        companyTypeValue === item.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              {companyTypeInputValue.trim() &&
                                !companyTypesSystemDataRef.current?.some(
                                  (item) =>
                                    item.label.toLowerCase() ===
                                    companyTypeInputValue.toLowerCase()
                                ) && (
                                  <CommandItem
                                    className="text-base border-t "
                                    value={companyTypeInputValue.trim()}
                                    onSelect={() =>
                                      handleAddCustomCompanyType()
                                    }
                                  >
                                    <span className="text-primary">
                                      + Thêm "{companyTypeInputValue.trim()}"
                                    </span>
                                  </CommandItem>
                                )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </>
                ) : (
                  <>
                    <p>
                      {defaultDataCompanyType.current
                        ? defaultDataCompanyType.current
                        : "Chưa có"}
                    </p>
                  </>
                )}
              </div>

              <div className=" flex items-center">
                <label className="text-foreground/70 min-w-[140px] text-sm">
                  Website công ty:
                </label>
                {isEnableEditOverview ? (
                  <>
                    <Input
                      defaultValue={defaultDataWebsiteUrl.current || ""}
                      ref={inputWebsiteUrlRef}
                      placeholder="Nhập website công ty"
                    ></Input>
                  </>
                ) : (
                  <>
                    <p>
                      {defaultDataWebsiteUrl.current ? (
                        <IconLink
                          link={defaultDataWebsiteUrl.current}
                        ></IconLink>
                      ) : (
                        "Chưa có"
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
