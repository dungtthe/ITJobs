import { useState, useRef, useEffect } from "react";
import no_img_user from "@/assets/images/no_img_user.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IconEdit } from "@/components/my-components/icon/IconEdit";
import { ButtonSuccess } from "@/components/my-components/button/ButtonSuccess";
import { ButtonDestructive } from "@/components/my-components/button/ButtonDestructive";
import { Input } from "@/components/ui/input";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/MyToast";
import { convertImageToBase64 } from "@/utils/imageUtils";
import { updateImage } from "@/shared-services/accounts/updateImage";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { MyCalendar } from "../../MyCalendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/authStore";
import { SocialMediaLinks } from "../../icon/SocialMediaLinks";
import { getSocialMedias } from "@/shared-services/system-value/getSocialMedias";
import { IconDelete } from "../../icon/IconDelete";
import { IconAdd } from "../../icon/IconAdd";
import { updateCandidateProfile } from "@/pages/candidate/profile/services/updateCandidateProfile";

export const Overview = ({ isCanEdit = false, profile }) => {
  const socialMediaSystem = useRef([]);
  const [newSocialMedia, setNewSocialMedia] = useState("");
  const [newSocialMediaLink, setNewSocialMediaLink] = useState("");
  useEffect(() => {
    getSocialMedias(
      (data) => {
        const socialMediaWithIds = data.map((name) => ({
          id: crypto.randomUUID(),
          name: name,
        }));
        socialMediaSystem.current = socialMediaWithIds;
        console.log("Social Media System:", socialMediaSystem.current);
      },
      () => {
        showErrorToastHasTitle("Lỗi", "Không thể tải dữ liệu mạng xã hội");
      },
      () => {
        showErrorToastHasTitle(
          "Lỗi",
          "Có lỗi xảy ra khi tải dữ liệu mạng xã hội"
        );
      }
    );
  }, []);

  const setUserStore = useUserStore((state) => state.setUser);
  const userStore = useUserStore((state) => state.user);

  //data
  const defaultFullName = useRef(profile?.fullName || null);
  const defaultPhoneNumber = useRef(profile?.phoneNumber || null);
  const defaultAddress = useRef(profile?.address || null);
  const defaultGender = useRef(profile?.gender || null);
  const defaultDateOfBirth = useRef(profile?.dateOfBirth || null);
  const defaultImage = useRef(profile?.image || no_img_user);
  const defaultSocialMediaLinks = useRef(
    (profile.socialMediaLinks || []).map((item) => ({
      ...item,
      id: crypto.randomUUID(),
    }))
  );
  // State
  const [fullName, setFullName] = useState(defaultFullName.current);
  const [phoneNumber, setPhoneNumber] = useState(defaultPhoneNumber.current);
  const [address, setAddress] = useState(defaultAddress.current);
  const [gender, setGender] = useState(defaultGender.current);
  const [dateOfBirth, setDateOfBirth] = useState(defaultDateOfBirth.current);
  const [imageData, setImageData] = useState(defaultImage.current);
  const [socialMediaLinks, setSocialMediaLinks] = useState(
    defaultSocialMediaLinks.current
  );

  const [isEnableEdit, setIsEnableEdit] = useState(false);
  const [isEnableEditImage, setIsEnableEditImage] = useState(false);

  // Refs
  const inputFileRef = useRef(null);

  const handleEnableEditImage = () => {
    setIsEnableEditImage(true);
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
    if (!file) return;

    if (!file.type.match("image.*")) {
      showErrorToastHasTitle("Lỗi", "Vui lòng chọn file hình ảnh");
      return;
    }

    try {
      const imgBase64 = await convertImageToBase64(file);
      setImageData(imgBase64);
    } catch (error) {
      console.error("Error converting image:", error);
      showErrorToastHasTitle("Lỗi", "Không thể xử lý hình ảnh này");
    }
  };

  const handleCancelEditImage = () => {
    setIsEnableEditImage(false);
    setImageData(defaultImage.current);
  };

  const handleSaveImage = () => {
    if (imageData === defaultImage.current) {
      setIsEnableEditImage(false);
      return;
    }
    updateImage(
      imageData,
      () => {
        setIsEnableEditImage(false);
        defaultImage.current = imageData;
        showSuccessToastHasTitle(
          "Thành công",
          "Cập nhật ảnh đại diện thành công"
        );

        setUserStore({
          ...userStore,
          image: imageData,
        });
      },
      () => {
        showErrorToastHasTitle("Lỗi", "Cập nhật ảnh đại diện thất bại");
      },
      () => {
        showErrorToastHasTitle(
          "Lỗi",
          "Có lỗi xảy ra khi cập nhật ảnh đại diện"
        );
      }
    );
  };

  const handleEnableEdit = () => {
    setIsEnableEdit(true);
  };

  const handleCancel = () => {
    setIsEnableEdit(false);
    setFullName(defaultFullName.current);
    setPhoneNumber(defaultPhoneNumber.current);
    setAddress(defaultAddress.current);
    setGender(defaultGender.current);
    setDateOfBirth(defaultDateOfBirth.current);
    setSocialMediaLinks(defaultSocialMediaLinks.current);
  };

  const handleSave = () => {
    if (
      fullName === defaultFullName.current &&
      phoneNumber === defaultPhoneNumber.current &&
      address === defaultAddress.current &&
      gender === defaultGender.current &&
      dateOfBirth === defaultDateOfBirth.current &&
      JSON.stringify(socialMediaLinks) ===
        JSON.stringify(defaultSocialMediaLinks.current)
    ) {
      setIsEnableEdit(false);
      return;
    }

    const dataUpdate = {
      fullName,
      phoneNumber,
      address,
      gender,
      dateOfBirth: dateOfBirth,
      socialMediaLinks: socialMediaLinks.map(({ id, ...rest }) => rest),
    };
    console.log("Data to update:", dataUpdate);
    updateCandidateProfile(
      dataUpdate,
      () => {
        defaultFullName.current = fullName;
        defaultPhoneNumber.current = phoneNumber;
        defaultAddress.current = address;
        defaultGender.current = gender;
        defaultDateOfBirth.current = dateOfBirth;
        defaultSocialMediaLinks.current = JSON.parse(
          JSON.stringify(socialMediaLinks)
        );
        setUserStore({
          ...userStore,
          name: fullName,
        });
        console.log("Profile updated successfully:", dataUpdate);
        setIsEnableEdit(false);
        showSuccessToastHasTitle("Thành công", "Cập nhật thông tin thành công");
      },
      (error) => {
        showErrorToastHasTitle(
          "Lỗi",
          error?.message || "Cập nhật thông tin thất bại"
        );
      },
      () => {
        showErrorToastHasTitle("Lỗi", "Có lỗi xảy ra khi cập nhật thông tin");
      }
    );
  };
  const handleAddSocialMedia = () => {
    if (!newSocialMedia || !newSocialMediaLink) {
      showErrorToastHasTitle(
        "Lỗi",
        "Vui lòng chọn mạng xã hội và nhập liên kết"
      );
      return;
    }

    const newLink = {
      id: crypto.randomUUID(),
      name: newSocialMedia,
      link: newSocialMediaLink,
    };

    setSocialMediaLinks([...socialMediaLinks, newLink]);
    setNewSocialMedia("");
    setNewSocialMediaLink("");
  };

  const handleRemoveSocialMedia = (id) => {
    setSocialMediaLinks(socialMediaLinks.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-card p-5 rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-2 justify-center hover:cursor-pointer">
          <h3 className="text-xl font-medium mb-3">Thông tin cá nhân</h3>
        </div>
      </div>

      <div className="border border-dashed w-full h-[1px]"></div>

      <div className="px-4 mt-5 flex">
        <div className="flex flex-col gap-2 border-r pr-12">
          <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden">
            <Avatar className="size-[200px]">
              {imageData === "no_img_user.png" ? (
                <AvatarImage src={no_img_user} />
              ) : (
                <AvatarImage src={imageData} alt="Avatar" />
              )}
            </Avatar>
          </div>

          <input
            type="file"
            ref={inputFileRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />

          <div className="flex flex-col justify-between mt-2">
            {isCanEdit && !isEnableEditImage && (
              <button
                className="text-primary hover:text-primary/80 text-sm flex items-center justify-center gap-1"
                onClick={handleEnableEditImage}
              >
                <IconEdit /> Đổi ảnh
              </button>
            )}

            {isEnableEditImage && (
              <div className="flex flex-col gap-2">
                <ButtonDestructive
                  content="Hủy"
                  onClick={handleCancelEditImage}
                />
                <ButtonSuccess content="Lưu" onClick={handleSaveImage} />
              </div>
            )}
          </div>
        </div>

        <div className="ml-10 flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-6 flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-20">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground/70">Email</label>
                <p className="text-foreground">{profile.email}</p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground/70">Họ và tên</label>
                {isEnableEdit ? (
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                ) : (
                  <p className="text-foreground">{fullName}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground/70">
                  Số điện thoại
                </label>
                {isEnableEdit ? (
                  <Input
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                ) : (
                  <p className="text-foreground">{phoneNumber || "Chưa có"}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground/70">Địa chỉ</label>
                {isEnableEdit ? (
                  <Input
                    placeholder="Địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                ) : (
                  <p className="text-foreground break-words word-wrap overflow-wrap-anywhere">
                    {address || "Chưa có"}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground/70">Giới tính</label>
                {isEnableEdit ? (
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled>
                      Chọn giới tính
                    </option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                ) : (
                  <p className="text-foreground">{gender || "Chưa có"}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground/70">Ngày sinh</label>
                {isEnableEdit ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className={cn(
                          "w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none"
                        )}
                      >
                        {dateOfBirth
                          ? format(dateOfBirth, "dd/MM/yyyy")
                          : "Chọn ngày sinh"}
                        <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <MyCalendar
                        mode="single"
                        selected={dateOfBirth}
                        onSelect={setDateOfBirth}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                ) : (
                  <p className="text-foreground">
                    {dateOfBirth
                      ? format(dateOfBirth, "dd/MM/yyyy")
                      : "Chưa có"}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground/70">
                  Mạng xã hội
                </label>
                {!isEnableEdit ? (
                  <SocialMediaLinks
                    items={socialMediaLinks.map((sm) => ({
                      name: sm.name,
                      url: sm.link,
                    }))}
                    className="flex gap-2"
                    classNameItem="text-foreground/70 hover:text-primary transition-colors text-lg"
                  />
                ) : (
                  <div className="flex flex-col gap-2">
                    {socialMediaLinks.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <span className="min-w-[100px]">{item.name}:</span>
                        <Input
                          value={item.link}
                          onChange={(e) => {
                            const updatedLinks = socialMediaLinks.map((sm) =>
                              sm.id === item.id
                                ? { ...sm, link: e.target.value }
                                : sm
                            );
                            setSocialMediaLinks(updatedLinks);
                          }}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSocialMedia(item.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <IconDelete />
                        </button>
                      </div>
                    ))}

                    <div className="flex items-center gap-2 mt-2">
                      <select
                        value={newSocialMedia}
                        onChange={(e) => setNewSocialMedia(e.target.value)}
                        className="w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none"
                      >
                        <option value="" disabled>
                          Chọn mạng xã hội
                        </option>
                        {socialMediaSystem.current.map((sm) => (
                          <option key={sm.id} value={sm.name}>
                            {sm.name}
                          </option>
                        ))}
                      </select>
                      <Input
                        placeholder="Nhập liên kết"
                        value={newSocialMediaLink}
                        onChange={(e) => setNewSocialMediaLink(e.target.value)}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        className="border rounded-md p-2 hover:bg-accent/10 transition-colors"
                        onClick={handleAddSocialMedia}
                      >
                        <IconAdd />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start gap-4">
            {isCanEdit && !isEnableEdit && (
              <IconEdit onClick={handleEnableEdit} />
            )}
            {isEnableEdit && (
              <>
                <ButtonDestructive content="Hủy" onClick={handleCancel} />
                <ButtonSuccess content="Lưu" onClick={handleSave} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
