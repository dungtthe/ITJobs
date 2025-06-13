import * as React from "react";
import { Check } from "lucide-react";
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
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react";

export const SearchFilterCombobox = ({
  values,
  name,
  id,
  onChange,
  initialValue = "",
}) => {
  const items = values.map((item) => ({
    value: item,
    label: item,
  }));

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [hasTriggeredInitial, setHasTriggeredInitial] = useState(false);

  useEffect(() => {
    if (initialValue !== undefined && !hasTriggeredInitial) {
      setValue(initialValue);
      if (onChange && initialValue) {
        // Chỉ trigger khi có initialValue và chưa trigger lần nào
        onChange(initialValue);
        setHasTriggeredInitial(true);
      }
    }
  }, [initialValue, onChange, hasTriggeredInitial]);

  const handleSelect = (currentValue) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    setOpen(false);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="filter-combobox-container">
      <label className="block text-sm font-medium mb-2">{name}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-base"
          >
            {value
              ? items.find((item) => item.value === value)?.label
              : "Lựa chọn..."}
            <IoIosArrowDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Tìm kiếm..." className="h-9" />
            <CommandList>
              <CommandEmpty>Không tìm thấy.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    className="text-base"
                    key={item.value}
                    value={item.value}
                    onSelect={handleSelect}
                  >
                    {item.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
