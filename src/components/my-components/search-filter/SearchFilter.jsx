import { SearchFilterCombobox } from "@/components/my-components/search-filter/SearchFilterCombobox";
import { SearchFilterCheckBox } from "@/components/my-components/search-filter/SearchFilterCheckBox";
import { SearchFilterRange } from "@/components/my-components/search-filter/SearchFilterRange";
import { useEffect, useState, useRef } from "react";
import { getSearchFilters } from "@/shared-services/search-filters/getSearchFilters.js";
import { toNumber } from "@/utils/convertUtils.js";

export const SearchFilter = ({
  className,
  onRangeChange,
  onCheckboxChange,
  onComboboxChange,
  ...props
}) => {
  const searchFilterComboboxsRef = useRef([]);
  const searchFilterCheckBoxsRef = useRef([]);
  const searchFilterRangesRef = useRef([]);
  const idAndTypeAndVieworderSearchFilterRef = useRef([]);
  const [keyRenderImediately, setKeyRenderImediately] = useState(0);

  useEffect(() => {
    getSearchFilters((sus) => {
      searchFilterComboboxsRef.current = sus.searchFilterComboboxs;
      searchFilterCheckBoxsRef.current = sus.searchFilterCheckBoxs;
      searchFilterRangesRef.current = sus.searchFilterRanges;

      idAndTypeAndVieworderSearchFilterRef.current = [];

      searchFilterComboboxsRef.current.map((item) => {
        idAndTypeAndVieworderSearchFilterRef.current.push({
          id: item.id,
          type: "combobox",
          viewOrder: item.viewOrder,
        });
      });

      searchFilterCheckBoxsRef.current.map((item) => {
        idAndTypeAndVieworderSearchFilterRef.current.push({
          id: item.id,
          type: "checkbox",
          viewOrder: item.viewOrder,
        });
      });

      searchFilterRangesRef.current.map((item) => {
        idAndTypeAndVieworderSearchFilterRef.current.push({
          id: item.id,
          type: "range",
          viewOrder: item.viewOrder,
        });
      });
      idAndTypeAndVieworderSearchFilterRef.current.sort(
        (a, b) => a.viewOrder - b.viewOrder
      );
      setKeyRenderImediately((prev) => prev + 1);
    });
  }, []);

  const handleRangeChange = (id, range) => {
    if (onRangeChange) {
      onRangeChange(id, range);
    }
  };

  const handleCheckboxChange = (id, selectedItems) => {
    if (onCheckboxChange) {
      onCheckboxChange(id, selectedItems);
    }
  };

  const handleComboboxChange = (id, value) => {
    if (onComboboxChange) {
      onComboboxChange(id, value);
    }
  };

  const renderFilterItem = (filterInfo) => {
    const { id, type } = filterInfo;

    switch (type) {
      case "range": {
        const rangeFilter = searchFilterRangesRef.current.find(
          (item) => item.id === id
        );
        if (!rangeFilter) return null;
        return (
          <div key={id} className="filter-item my-3">
            <SearchFilterRange
              min={rangeFilter.min}
              max={rangeFilter.max}
              name={rangeFilter.name}
              id={rangeFilter.id}
              onChange={(id, range) => handleRangeChange(id, range)}
            />
          </div>
        );
      }
      case "checkbox": {
        const checkboxFilter = searchFilterCheckBoxsRef.current.find(
          (item) => item.id === id
        );
        if (!checkboxFilter) return null;
        return (
          <div key={id} className="filter-item my-3">
            <SearchFilterCheckBox
              values={checkboxFilter.values}
              name={checkboxFilter.name}
              id={checkboxFilter.id}
              onChange={(selectedItems) =>
                handleCheckboxChange(checkboxFilter.id, selectedItems)
              }
            />
          </div>
        );
      }
      case "combobox": {
        const comboboxFilter = searchFilterComboboxsRef.current.find(
          (item) => item.id === id
        );
        if (!comboboxFilter) return null;
        return (
          <div key={id} className="filter-item my-3">
            <SearchFilterCombobox
              values={comboboxFilter.values}
              name={comboboxFilter.name}
              id={comboboxFilter.id}
              onChange={(value) =>
                handleComboboxChange(comboboxFilter.id, value)
              }
            />
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div
      {...props}
      key={keyRenderImediately}
      className={`search-filters-container ${className || ""}`}
    >
      {idAndTypeAndVieworderSearchFilterRef.current.map((filterInfo) =>
        renderFilterItem(filterInfo)
      )}
    </div>
  );
};
