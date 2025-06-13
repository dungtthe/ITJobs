import * as React from "react";
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
import { useState, useMemo, useEffect } from "react";

export const SearchFilterCheckBox = ({
  values,
  name,
  id,
  placeholder = "Lựa chọn...",
  onChange,
  maxDisplayItems = 2,
  initialSelectedItems = [],
}) => {
  const items = values.map((item) => ({
    value: item,
    label: item,
  }));

  const getInitialSelectedItems = () => {
    if (initialSelectedItems && initialSelectedItems.length > 0) {
      return initialSelectedItems.map((value) => ({
        value: value,
        label: value,
      }));
    }
    return [];
  };

  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(getInitialSelectedItems);
  const [hasTriggeredInitial, setHasTriggeredInitial] = useState(false);

  useEffect(() => {
    if (
      initialSelectedItems &&
      initialSelectedItems.length > 0 &&
      !hasTriggeredInitial
    ) {
      const newSelectedItems = initialSelectedItems.map((value) => ({
        value: value,
        label: value,
      }));
      setSelectedItems(newSelectedItems);
      if (onChange) {
        onChange(newSelectedItems);
        setHasTriggeredInitial(true);
      }
    }
  }, [initialSelectedItems, onChange, hasTriggeredInitial]);

  const handleSelect = (item) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.value === item.value
    );

    let updatedItems;
    if (isSelected) {
      updatedItems = selectedItems.filter(
        (selectedItem) => selectedItem.value !== item.value
      );
    } else {
      updatedItems = [...selectedItems, item];
    }

    setSelectedItems(updatedItems);

    if (onChange) {
      onChange(updatedItems);
    }
  };

  const displayText = useMemo(() => {
    if (selectedItems.length === 0) {
      return placeholder;
    }

    if (selectedItems.length <= maxDisplayItems) {
      return selectedItems.map((item) => item.label).join(", ");
    } else {
      const visibleItems = selectedItems
        .slice(0, maxDisplayItems)
        .map((item) => item.label)
        .join(", ");

      return `(${selectedItems.length}) ${visibleItems}...`;
    }
  }, [selectedItems, maxDisplayItems, placeholder]);

  return (
    <div className="filter-checkbox-container">
      <label className="block text-sm font-medium mb-2">{name}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            title={
              selectedItems.length > 0
                ? selectedItems.map((item) => item.label).join(", ")
                : ""
            }
          >
            <span className="truncate mr-1 text-base">{displayText}</span>
            <IoIosArrowDown className="opacity-50 flex-shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Tìm kiếm..." className="h-9" />
            <CommandList>
              <CommandEmpty>Không tìm thấy.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => {
                  const isSelected = selectedItems.some(
                    (selectedItem) => selectedItem.value === item.value
                  );

                  return (
                    <CommandItem
                      key={item.value}
                      onSelect={() => handleSelect(item)}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={`checkbox-${id}-${item.value}`}
                        checked={isSelected}
                        onChange={() => {}}
                        className="mr-2 !accent-primary"
                      />
                      <label
                        htmlFor={`checkbox-${id}-${item.value}`}
                        className="flex-grow cursor-pointer text-base"
                      >
                        {item.label}
                      </label>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
