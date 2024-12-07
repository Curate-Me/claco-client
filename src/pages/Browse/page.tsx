import { SearchBar } from "@/components/common/Search/Bar";
import { ShowFilterTab } from "@/components/common/ShowFilterTab";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Filter } from "@/assets/svgs/filter.svg";
import { ReactComponent as Refresh } from "@/assets/svgs/refresh.svg";
import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { SearchCard } from "@/components/common/Search/Card";
import { ShowFilter } from "@/components/Browse/ShowFilter";
import { ShowSummaryCard } from "@/components/common/ShowSummaryCard";
import {
  useDebouncedState,
  useDeferredLoading,
  useRefFocusEffect,
  useShowFilter,
} from "@/hooks/utils";
import {
  useGetAutoCompleteSearch,
  useGetConcertFilters,
  useGetConcertList,
  useGetSearch,
} from "@/hooks/queries";
import { AutoCompleteSearchCard, FilterValue, TabMenu } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchResult } from "@/components/Browse/SearchResult";
import { RecentConcertResult } from "@/components/Browse/RecentConcertResult";

export const BrowsePage = () => {
  const [query, setQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabMenu>(null);
  const [skipDebounce, setSkipDebounce] = useState<boolean>(false);
  const debouncedQuery = useDebouncedState(query, 500, skipDebounce);
  const [filterValue, setFilterValue] = useState<FilterValue | null>(null);
  const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isNoSearchResult, setIsNoSearchResult] = useState<boolean>(false);
  const [isNoFilterResult, setIsNoFilterResult] = useState<boolean>(false);
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
  const [autoCompleteList, setAutoCompleteList] = useState<
    AutoCompleteSearchCard[]
  >([]);

  const {
    data: concertData,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetConcertList({
    genre: activeTab,
    size: 9,
    // enabled: !isFilterOn,
  });

  const { data: autoCompleteData, isLoading: autoCompleteDataLoading } =
    useGetAutoCompleteSearch(debouncedQuery);

  const {
    data: searchData,
    fetchNextPage: searchFetchNextPage,
    isFetchingNextPage: isFetchingSearchNext,
    isLoading: searchLoading,
  } = useGetSearch({
    query: debouncedQuery,
    size: 9,
  });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const {
    filterState,
    showFilter,
    hasActiveFilters,
    handleFilterClick,
    handleRefreshClick,
    applyFilter,
    closeFilter,
  } = useShowFilter();

  useEffect(() => {
    const savedFilter = localStorage.getItem("filterObj");
    if (savedFilter) {
      const parsedFilter = JSON.parse(savedFilter);
      setFilterValue(parsedFilter);
      setIsFilterOn(true);
    }
  }, [showFilter]);

  const {
    data: filterConcertData,
    fetchNextPage: filterFetchNextPage,
    isFetchingNextPage: isFilterFetchingNextPage,
    isLoading: isFilterSearchLoading,
  } = useGetConcertFilters({
    minPrice: filterValue?.minPrice,
    maxPrice: filterValue?.maxPrice,
    area: filterValue?.selectedLocation,
    startDate: filterValue?.startDate,
    endDate: filterValue?.endDate,
    categories: filterValue?.categories,
    size: 9,
    enabled: isFilterOn,
  });

  const navigate = useNavigate();
  const gotoShowDetail = (id: number) => {
    navigate(`/show/${id}`);
  };

  const handleRefreshButton = () => {
    setIsFilterOn(false);
    setFilterValue(null);
    setIsNoFilterResult(false);
    localStorage.removeItem("filterObj");
    handleRefreshClick();
  };

  const { shouldShowSkeleton } = useDeferredLoading(isLoading);

  const { elementRef: recentRef } = useRefFocusEffect<HTMLDivElement>(
    fetchNextPage,
    [concertData, isSearch, isFilterOn]
  );
  const { elementRef: filterRef } = useRefFocusEffect<HTMLDivElement>(
    filterFetchNextPage,
    [filterConcertData, isFilterOn]
  );
  const { elementRef: searchRef } = useRefFocusEffect<HTMLDivElement>(
    searchFetchNextPage,
    [searchData, isSearch]
  );

  const handleTabClick = (tab: TabMenu) => {
    setActiveTab(tab);
    setIsFilterOn(false);
    setFilterValue(null);
    localStorage.removeItem("filterObj");
    handleRefreshClick();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSkipDebounce(newValue === "");
    setQuery(newValue);
    if (newValue.trim().length === 0) setAutoCompleteList([]);
  };

  const isProcessing = useRef(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isProcessing.current) {
      e.preventDefault();
      e.stopPropagation();

      isProcessing.current = true;

      setIsSearch(false);
      setShowSearchResult(true);
      setSkipDebounce(true);
      setActiveTab(null);

      setTimeout(() => {
        isProcessing.current = false;
        searchInputRef.current?.blur();
      }, 300);
    }
  };

  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem("filterObj");
  //   };
  // }, []);

  useEffect(() => {
    if (autoCompleteData && !autoCompleteDataLoading) {
      setAutoCompleteList(autoCompleteData.result);
    }
  }, [
    debouncedQuery,
    autoCompleteDataLoading,
    setAutoCompleteList,
    autoCompleteData,
  ]);

  useEffect(() => {
    if (searchData && !searchLoading) {
      if (
        searchData.pages[0].result.listPageResponse[0]
          .recommendationConcertsResponseV1s
      ) {
        setIsNoSearchResult(true);
      }
    }

    if (filterConcertData && !isFilterSearchLoading) {
      if (filterConcertData.pages[0].result.listPageResponse.length === 0) {
        setIsNoFilterResult(true);
      }
    }
  }, [searchData, searchLoading, filterConcertData, isFilterSearchLoading]);

  useEffect(() => {
    if (skipDebounce) {
      const timer = setTimeout(() => {
        setSkipDebounce(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [skipDebounce]);

  if (shouldShowSkeleton) {
    return (
      <div className="px-6 pb-[110px] min-h-screen relative">
        <div className="flex flex-col items-center justify-center">
          <div className="mt-[46px] mb-[30px] flex items-center relative w-full justify-center">
            <span className="headline2-bold text-grayscale-80">둘러보기</span>
          </div>
          <div className="relative w-full">
            <SearchBar
              ref={searchInputRef}
              value={query}
              onFocus={() => setIsSearch(true)}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder={"공연명, 출연자, 극단 등을 검색하세요."}
            />
            <ShowFilterTab
              activeTab={activeTab}
              onTabClick={handleTabClick}
              className="mt-6 mb-[14px]"
            />
            <div className="flex justify-between mb-[10px]">
              <Skeleton className="w-[68px] h-[16px]" />
              <Skeleton className="w-[68px] h-[16px]" />
            </div>
            <div className="flex flex-col gap-[22px]">
              {Array.from(Array(5).keys()).map((_, index) => (
                <ShowSummaryCard.Skeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pb-[110px] min-h-screen relative">
      <div className="flex flex-col items-center justify-center">
        <div className="mt-[46px] mb-[30px] flex items-center relative w-full justify-center">
          {isSearch ? (
            <BackArrow
              className="absolute left-0"
              onClick={() => {
                setIsSearch(false);
                setShowSearchResult(false);
                setIsNoSearchResult(false);
              }}
            />
          ) : null}

          <span className="headline2-bold text-grayscale-80">둘러보기</span>
        </div>
        <div className="relative w-full">
          <SearchBar
            ref={searchInputRef}
            value={query}
            onFocus={() => setIsSearch(true)}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder={"공연명, 출연자, 극단 등을 검색하세요."}
          />

          {/* 검색어 자동 완성 영역 */}
          {isSearch ? (
            <div className="flex flex-col space-y-[11px] mt-[11px]">
              {debouncedQuery.trim().length !== 0 ? (
                <>
                  {autoCompleteList.length !== 0 ? (
                    <>
                      {" "}
                      {autoCompleteList?.map((show) => (
                        <SearchCard
                          key={show.id}
                          data={show}
                          searchKeyWord={query}
                          onClick={() => gotoShowDetail(show.id)}
                        />
                      ))}
                    </>
                  ) : null}
                </>
              ) : null}
            </div>
          ) : (
            <>
              {debouncedQuery.trim().length === 0 ? (
                <ShowFilterTab
                  activeTab={activeTab}
                  onTabClick={handleTabClick}
                  className="mt-6 mb-[14px]"
                />
              ) : null}

              {showFilter && (
                <ShowFilter onClose={closeFilter} onApply={applyFilter} />
              )}

              <div className="flex items-center justify-between gap-3 py-1">
                {hasActiveFilters ? (
                  <div className="flex text-center gap-[5px] pl-1 py-[2px] overflow-x-auto scrollbar-hide">
                    {filterState.priceRange && (
                      <div className="rounded-[20px] px-[10px] py-1 border-[0.5px] border-grayscale-60 bg-transparent caption-12 text-grayscale-60 whitespace-nowrap">
                        {filterState.priceRange}
                      </div>
                    )}
                    {filterState.selectedLocation && (
                      <div className="rounded-[20px] px-[10px] py-1 border-[0.5px] border-grayscale-60 bg-transparent caption-12 text-grayscale-60 whitespace-nowrap">
                        {filterState.selectedLocation}
                      </div>
                    )}
                    {filterState.dateRange && (
                      <div className="rounded-[20px] px-[10px] py-1 border-[0.5px] border-grayscale-60 bg-transparent caption-12 text-grayscale-60 whitespace-nowrap">
                        {filterState.dateRange}
                      </div>
                    )}
                    {filterState.selectedFeature && (
                      <div className="rounded-[20px] px-[10px] py-1 border-[0.5px] border-grayscale-60 bg-transparent caption-12 text-grayscale-60 whitespace-nowrap">
                        {filterState.selectedFeature}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="headline1-bold text-grayscale-80">
                    {debouncedQuery.trim().length === 0 ? "최근 공연" : null}
                  </span>
                )}
                {debouncedQuery.trim().length === 0 ? (
                  <div className="flex gap-2">
                    <Filter onClick={handleFilterClick} />
                    <Refresh onClick={handleRefreshButton} />
                  </div>
                ) : null}
              </div>
              <div className="mt-4">
                {hasActiveFilters && (
                  <span className="headline1-bold text-grayscale-80">
                    {debouncedQuery.trim().length === 0 ? "최근 공연" : null}
                  </span>
                )}
              </div>
              {debouncedQuery.trim().length === 0 ? (
                <>
                  {isFilterOn && filterConcertData ? (
                    <RecentConcertResult
                      concertData={filterConcertData}
                      isFetchingNextPage={isFilterFetchingNextPage}
                    />
                  ) : (
                    concertData && (
                      <RecentConcertResult
                        concertData={concertData}
                        isFetchingNextPage={isFetchingNextPage}
                      />
                    )
                  )}
                </>
              ) : (
                <>
                  {searchData && (
                    <SearchResult
                      searchData={searchData}
                      isFetchingNextPage={isFetchingSearchNext}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
        {isNoSearchResult || isNoFilterResult ? null : (
          <>
            {!isSearch ? (
              <div
                className="h-1"
                ref={
                  showSearchResult
                    ? searchRef
                    : isFilterOn
                      ? filterRef
                      : recentRef
                }
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};
