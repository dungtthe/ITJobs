import { SearchFilterCombobox } from "@/components/my-components/search-filter/SearchFilterCombobox";
import { SearchFilterCheckBox } from "@/components/my-components/search-filter/SearchFilterCheckBox";
import { SearchFilterRange } from "@/components/my-components/search-filter/SearchFilterRange";
export const SearchFilter = () => {
  const data = [
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Đà Nẵng",
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
  ];
  return (
    <div>
      <SearchFilterCombobox data={data}></SearchFilterCombobox>
      <SearchFilterCheckBox data={data}></SearchFilterCheckBox>
      <SearchFilterRange
        className="w-[300px] mt-4"
        min={-100}
        max={-10}
        defaultValue={-50}
      ></SearchFilterRange>
    </div>
  );
};
