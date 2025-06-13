import { useState, useEffect, useRef } from "react";
import { IconEdit } from "@/components/my-components/icon/IconEdit";
import { IconAdd } from "@/components/my-components/icon/IconAdd";
import { IconDelete } from "@/components/my-components/icon/IconDelete";
import { ButtonSuccess } from "@/components/my-components/button/ButtonSuccess";
import { ButtonDestructive } from "@/components/my-components/button/ButtonDestructive";
import { getSkills } from "@/shared-services/search-filters/getSkills";
import {
  showErrorToastHasTitle,
  showSuccessToastHasTitle,
} from "@/components/my-components/MyToast";
import { updateSkills } from "@/pages/employer/company-profile/services/updateSkills";
import { Skill } from "./Skill";
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

export const OurSkills = ({
  title,
  skills,
  classNameRow,
  isCanEdit,
  bg = "bg-background",
}) => {
  const defaultSkillsData = skills.map((item) => ({
    skillName: item,
    id: crypto.randomUUID(),
  }));

  const [skillsData, setSkillsData] = useState(defaultSkillsData);
  const [isEnableEdit, setIsEnableEdit] = useState(false);

  const skillSystemDataRef = useRef([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSelectSkillInComboBox = (currentValue) => {
    const skillExists = skillsData.some(
      (item) => item.skillName === currentValue
    );

    if (skillExists) {
      showErrorToastHasTitle("Lỗi", "Kỹ năng đã tồn tại trong danh sách");
      setValue("");
      setInputValue("");
      setOpen(false);
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      skillName: currentValue,
    };
    setSkillsData([...skillsData, newItem]);
    setValue("");
    setInputValue("");
    setOpen(false);
  };

  const handleAddCustomSkill = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      showErrorToastHasTitle("Lỗi", "Tên kỹ năng không được để trống");
      return;
    }

    const skillExists = skillsData.some(
      (item) => item.skillName.toLowerCase() === trimmedValue.toLowerCase()
    );

    if (skillExists) {
      showErrorToastHasTitle("Lỗi", "Kỹ năng đã tồn tại trong danh sách");
      setInputValue("");
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      skillName: trimmedValue,
    };
    setSkillsData([...skillsData, newItem]);
    setInputValue("");
    setOpen(false);
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
        showErrorToastHasTitle("Lỗi", "Không thể tải kỹ năng hệ thống");
      },
      () => {
        skillSystemDataRef.current = [];
        showErrorToastHasTitle("Lỗi", "Không thể tải kỹ năng hệ thống");
      }
    );
  }, []);

  const handleEnbleEdit = () => {
    setIsEnableEdit(!isEnableEdit);
  };

  const handleHuy = () => {
    setIsEnableEdit(false);
    setSkillsData(defaultSkillsData);
    setInputValue("");
    setValue("");
  };

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
    updateSkills(
      skillsToUpdate,
      () => {
        showSuccessToastHasTitle("Thành công", "Cập nhật kỹ năng thành công");
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
        showErrorToastHasTitle("Thất bại", error.message);
      },
      (exception) => {
        console.error("Exception in handleLuu:", exception);
        showErrorToastHasTitle("Lỗi", "Đã xảy ra lỗi không mong muốn");
      }
    );
  };

  return (
    <div className={`${bg} p-5 rounded-lg`}>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <h3 className="text-xl font-medium">{title}</h3>
          {isEnableEdit && (
            <div className="ml-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between text-base"
                  >
                    {value
                      ? skillSystemDataRef.current?.find(
                          (item) => item.value === value
                        )?.label
                      : "Thêm kỹ năng..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Tìm kiếm kỹ năng..."
                      className="h-9"
                      value={inputValue}
                      onValueChange={setInputValue}
                    />
                    <CommandList>
                      <CommandEmpty>
                        <div className="p-2">
                          <p className="text-sm text-muted-foreground mb-2">
                            Không tìm thấy kỹ năng
                          </p>
                          {inputValue.trim() && (
                            <Button
                              size="sm"
                              onClick={handleAddCustomSkill}
                              className="w-full"
                            >
                              Thêm "{inputValue.trim()}"
                            </Button>
                          )}
                        </div>
                      </CommandEmpty>
                      <CommandGroup>
                        {skillSystemDataRef.current
                          ?.filter((item) =>
                            item.label
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                          )
                          .map((item) => (
                            <CommandItem
                              className="text-base"
                              key={item.value}
                              value={item.value}
                              onSelect={handleSelectSkillInComboBox}
                            >
                              {item.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  value === item.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        {inputValue.trim() &&
                          !skillSystemDataRef.current?.some(
                            (item) =>
                              item.label.toLowerCase() ===
                              inputValue.toLowerCase()
                          ) && (
                            <CommandItem
                              className="text-base border-t"
                              value={inputValue.trim()}
                              onSelect={() => handleAddCustomSkill()}
                            >
                              <span className="text-primary">
                                + Thêm "{inputValue.trim()}"
                              </span>
                            </CommandItem>
                          )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
        {isCanEdit && !isEnableEdit && (
          <IconEdit onClick={handleEnbleEdit}></IconEdit>
        )}
      </div>
      <div className="border border-dashed w-full h-[1px] mt-3"></div>
      {skillsData.length === 0 && <p className="pt-5">Chưa có thông tin</p>}
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
