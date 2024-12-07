import { useState } from "react";

export type FilterState = {
  priceRange: string;
  selectedLocation: string;
  dateRange: string;
  selectedFeature: string;
};

export type UseShowFilterReturn = {
  filterState: FilterState;
  showFilter: boolean;
  hasActiveFilters: boolean;
  setShowFilter: (show: boolean) => void;
  handleFilterClick: () => void;
  handleRefreshClick: () => void;
  applyFilter: (
    price: string,
    location: string,
    date: string,
    feature: string
  ) => void;
  closeFilter: () => void;
};

const useShowFilter = (): UseShowFilterReturn => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<FilterState>({
    priceRange: "",
    selectedLocation: "",
    dateRange: "",
    selectedFeature: "",
  });

  const hasActiveFilters = Object.values(filterState).some(
    (value) => value !== ""
  );

  const handleFilterClick = () => {
    setShowFilter(true);
  };

  const handleRefreshClick = () => {
    setFilterState({
      priceRange: "",
      selectedLocation: "",
      dateRange: "",
      selectedFeature: "",
    });
  };

  const closeFilter = () => {
    setShowFilter(false);
  };

  const applyFilter = (
    price: string,
    location: string,
    date: string,
    feature: string
  ) => {
    setFilterState({
      priceRange: price,
      selectedLocation: location,
      dateRange: date,
      selectedFeature: feature,
    });
    closeFilter();
  };

  return {
    filterState,
    showFilter,
    hasActiveFilters,
    setShowFilter,
    handleFilterClick,
    handleRefreshClick,
    applyFilter,
    closeFilter,
  };
};

export default useShowFilter;
