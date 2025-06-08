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
import no_img_user from "@/assets/images/no_img_user.png";

export const CompanyFilterCombobox = ({
  companies,
  onChange,
  selectedUserId,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    if (selectedUserId && companies.length > 0) {
      const company = companies.find((c) => c.userId === selectedUserId);
      setSelectedCompany(company || null);
    } else {
      setSelectedCompany(null);
    }
  }, [selectedUserId, companies]);

  const handleSelect = (userId) => {
    if (selectedCompany && selectedCompany.userId === userId) {
      setSelectedCompany(null);
      setOpen(false);
      onChange && onChange("");
      return;
    }

    const company = companies.find((company) => company.userId === userId);
    setSelectedCompany(company);
    setOpen(false);
    onChange && onChange(userId);
  };

  return (
    <div className="company-filter-combobox">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-11 px-4"
          >
            {selectedCompany ? (
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-sm overflow-hidden">
                  {!selectedCompany.image ||
                  selectedCompany.image === "no_img_user.png" ? (
                    <img
                      src={no_img_user}
                      alt="Company logo"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={selectedCompany.image}
                      alt="Company logo"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <span className="truncate">{selectedCompany.companyName}</span>
              </div>
            ) : (
              "Tất cả công ty"
            )}
            <IoIosArrowDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Tìm kiếm công ty..." className="h-9" />
            <CommandList className="max-h-[300px]">
              <CommandEmpty>Không tìm thấy công ty.</CommandEmpty>
              <CommandGroup>
                {companies.map((company) => (
                  <CommandItem
                    className="text-base flex items-center gap-2 py-2"
                    key={company.userId}
                    value={company.companyName}
                    onSelect={() => handleSelect(company.userId)}
                  >
                    <div className="h-8 w-8 rounded-sm overflow-hidden flex-shrink-0">
                      {!company.image || company.image === "no_img_user.png" ? (
                        <img
                          src={no_img_user}
                          alt="Company logo"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <img
                          src={company.image}
                          alt="Company logo"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <span className="truncate flex-grow">
                      {company.companyName}
                    </span>
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedCompany &&
                          selectedCompany.userId === company.userId
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
    </div>
  );
};
