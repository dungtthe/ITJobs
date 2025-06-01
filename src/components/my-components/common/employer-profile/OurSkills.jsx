import { useState, useEffect, useRef } from "react";
import { IconEdit } from "@/components/my-components/common/icon/IconEdit";
import { IconAdd } from "@/components/my-components/common/icon/IconAdd";
import { IconDelete } from "@/components/my-components/common/icon/IconDelete";
import { ButtonSuccess } from "@/components/my-components/common/button/ButtonSuccess";
import { ButtonDestructive } from "@/components/my-components/common/button/ButtonDestructive";
import { getSkills } from "@/services/search-filters/skills/getSkills";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/common/MyToast";
import { updateSkills } from "@/features/employer/company-profile/usecases/commands/updateSkills";
import { Skill } from "./Skill";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
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
export const OurSkills = ({ title, skills, classNameRow, isCanEdit }) => {
  const defaultSkillsData = skills.map((item) => ({
    skillName: item,
    id: crypto.randomUUID(),
  }));

  const [skillsData, setSkillsData] = useState(defaultSkillsData);
  const [isEnableEdit, setIsEnableEdit] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const skillSystemDataRef = useRef(null);
  //combobox chon skill
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSelectSkillInComboBox = (value) => {
    const skillExists = skillsData.some((item) => item.skillName === value);

    if (skillExists) {
      showErrorToastHasTitle(
        "Lỗi",
        "Kỹ năng đã tồn tại trong danh sách",
        "top-center"
      );
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      skillName: value,
    };
    setSkillsData([...skillsData, newItem]);
  };

  useEffect(() => {
    getSkills(
      (sus) => {
        skillSystemDataRef.current = sus.map((item) => ({
          value: item,
          label: item,
        }));
        console.log(skillSystemDataRef.current);
      },
      () => {
        skillSystemDataRef.current = [];
        showErrorToastHasTitle(
          "Lỗi",
          "Không thể tải kỹ năng hệ thống",
          "top-center"
        );
      },
      () => {
        skillSystemDataRef.current = [];
        showErrorToastHasTitle(
          "Lỗi",
          "Không thể tải kỹ năng hệ thống",
          "top-center"
        );
      }
    );
  }, []);

  //btn
  const handleEnbleEdit = () => {
    setIsEnableEdit(!isEnableEdit);
  };
  const handleHuy = () => {
    setIsEnableEdit(false);
    setSkillsData(defaultSkillsData);
  };

  const handleAdd = () => {};

  const handleDeleteItem = (id) => () => {
    const dataCur = [...skillsData];
    const dataNew = [];
    dataCur.map((item) => {
      if (item.id !== id) {
        dataNew.push(item);
      }
    });
    setSkillsData(dataNew);
  };

  const handleLuu = () => {
    const skillsToUpdate = skillsData.map((item) => item.skillName);
    if (skillsToUpdate.length === 0) {
      showErrorToastHasTitle(
        "Lỗi",
        "Danh sách kỹ năng không được để trống",
        "top-center"
      );
      return;
    }

    updateSkills(
      skillsToUpdate,
      () => {
        showSuccessToastHasTitle(
          "Thành công",
          "Cập nhật kỹ năng thành công",
          "top-center"
        );
        setIsEnableEdit(false);
        setSkillsData(
          skillsToUpdate.map((skill) => ({
            skillName: skill,
            id: crypto.randomUUID(),
          }))
        );
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
  return (
    <div className="bg-background p-5 rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-2 justify-center hover:cursor-pointer">
          <h3 className="text-xl font-medium mb-3">{title}</h3>
          {isEnableEdit && (
            <>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger>
                  <IconAdd onClick={handleAdd}></IconAdd>
                </DialogTrigger>
                <DialogContent className="w-max px-10">
                  <DialogHeader>
                    <DialogDescription>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                          >
                            {value
                              ? skillSystemDataRef.current.find(
                                  (framework) => framework.value === value
                                )?.label
                              : "Chọn kỹ năng..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Chọn kỹ năng..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>Không tìm thấy</CommandEmpty>
                              <CommandGroup>
                                {skillSystemDataRef.current.map((framework) => (
                                  <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                      handleSelectSkillInComboBox(currentValue);
                                      setValue("");
                                      //   setValue(
                                      //     currentValue === value
                                      //       ? ""
                                      //       : currentValue
                                      //   );
                                      setOpen(false);
                                      setDialogOpen(false);
                                    }}
                                  >
                                    {framework.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        value === framework.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
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
      <div className="px-4 mt-5 flex flex-wrap">
        {skillsData.map((item) => (
          <div key={item.id} className={classNameRow}>
            <div className="flex mr-4">
              <Skill skillName={item.skillName} />
              {isEnableEdit && (
                <IconDelete
                  className="!size-4"
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
  );
};
