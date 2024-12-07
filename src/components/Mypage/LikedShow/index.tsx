import { SearchBar } from "@/components/common/Search/Bar";
import { ShowFilterTab } from "@/components/common/ShowFilterTab";
import { ShowSummaryCard } from "@/components/common/ShowSummaryCard";
import { useEffect, useState } from "react";
import { useDebouncedState, useDeferredLoading } from "@/hooks/utils";
import { TabMenu } from "@/types";
import { useGetConcertLikes } from "@/hooks/queries";

export const LikedShow = () => {
  const [activeTab, setActiveTab] = useState<TabMenu>(null);
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebouncedState(query, 1000);

  const { data, isLoading, refetch } = useGetConcertLikes({
    query: debouncedQuery,
    genre: activeTab || "",
  });

  const { shouldShowSkeleton } = useDeferredLoading(isLoading);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.trim());
  };

  const handleTabClick = (tab: TabMenu) => {
    setActiveTab(tab);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [debouncedQuery, activeTab, refetch]);

  if (shouldShowSkeleton) {
    return (
      <div className="relative w-full">
        <ShowFilterTab
          activeTab={activeTab}
          onTabClick={handleTabClick}
          className="mb-[19px]"
        />
        <div className="relative w-full mb-[22px]">
          <SearchBar
            value={query}
            onChange={handleSearchChange}
            placeholder={"공연 이름을 검색해주세요"}
          />
        </div>
        <div className="flex flex-col gap-[22px]">
          {Array.from(Array(5).keys()).map((_, index) => (
            <ShowSummaryCard.Skeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col pb-10">
      <ShowFilterTab
        activeTab={activeTab}
        onTabClick={handleTabClick}
        className="mb-[19px]"
      />
      <div className="relative w-full mb-[22px]">
        <SearchBar
          value={query}
          onChange={handleSearchChange}
          placeholder={"공연 이름을 검색해주세요"}
        />
      </div>
      <div className="flex flex-col gap-[29px]">
        {data?.result?.map((show) => (
          <ShowSummaryCard key={show.id} data={show} />
        ))}
      </div>
    </div>
  );
};
