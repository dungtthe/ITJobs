import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export const SearchFilterRange = ({
  className,
  min,
  max,
  defaultValue,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState([defaultValue]);

  const handleValueChange = (newValue) => {
    console.log("Selected value:", newValue[0]);
    setValue(newValue);
    if (onChange) {
      onChange(newValue[0]);
    }
  };
  return (
    <>
      <Slider
        className={className}
        defaultValue={[defaultValue]}
        value={value}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={1}
        {...props}
      />
      <div className="mt-2 text-sm">Giá trị đã chọn: {value[0]}</div>
    </>
  );
};
