import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { toNumber } from "@/utils/convertUtils.js";
import { formatVND } from "@/utils/formatUtils.js";

export const SearchFilterRange = ({
  min,
  max,
  name,
  id,
  className,
  onChange,
  initialValue,
  ...props
}) => {
  const minValue = toNumber(min) || 0;
  const maxValue = toNumber(max) || 1000000000;

  const getInitialValues = () => {
    if (initialValue && typeof initialValue === "object") {
      return [
        typeof initialValue.min === "number"
          ? initialValue.min
          : toNumber(initialValue.min) || minValue,
        typeof initialValue.max === "number"
          ? initialValue.max
          : toNumber(initialValue.max) || maxValue,
      ];
    }
    return [minValue, maxValue];
  };

  const [values, setValues] = useState(getInitialValues);

  useEffect(() => {
    if (initialValue && typeof initialValue === "object") {
      const newValues = [
        typeof initialValue.min === "number"
          ? initialValue.min
          : toNumber(initialValue.min) || minValue,
        typeof initialValue.max === "number"
          ? initialValue.max
          : toNumber(initialValue.max) || maxValue,
      ];
      setValues(newValues);
      if (onChange) {
        onChange(id, { min: newValues[0], max: newValues[1] });
      }
    }
  }, [initialValue, id, onChange, minValue, maxValue]);

  const handleValueChange = (newValues) => {
    const sortedValues = [...newValues].sort((a, b) => a - b);
    setValues(sortedValues);

    if (onChange) {
      onChange(id, { min: sortedValues[0], max: sortedValues[1] });
    }
  };

  return (
    <div className="filter-range-container">
      <label className="block text-sm font-medium mb-2">{name}</label>
      <Slider
        className={className}
        defaultValue={getInitialValues()}
        value={values}
        onValueChange={handleValueChange}
        min={minValue}
        max={maxValue}
        step={1000000}
        {...props}
      />
      <div className="mt-2 text-sm flex justify-between">
        <span>{name.includes("lương") ? formatVND(values[0]) : values[0]}</span>
        <span>đến</span>
        <span>{name.includes("lương") ? formatVND(values[1]) : values[1]}</span>
      </div>
    </div>
  );
};
