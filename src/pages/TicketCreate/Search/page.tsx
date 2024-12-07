import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { ConfirmButton } from "@/components/common/Button";
import { SearchBar } from "@/components/common/Search/Bar";
import { SearchCard } from "@/components/common/Search/Card";
import { Progress } from "@/components/ui/progress";
import { useGetReviewAutoCompleteSearch } from "@/hooks/queries";
import { useDebouncedState } from "@/hooks/utils";
import { AutoCompleteSearchCard } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TicketSearchPage = () => {
  const [selectedShow, setSelectedShow] = useState<number | null>(null);
  const [query, setQuery] = useState<string>("");
  const [skipDebounce, setSkipDebounce] = useState<boolean>(false);
  const debouncedQuery = useDebouncedState(query, 500);

  const navigate = useNavigate();

  const { data: autoCompleteData, isLoading: autoCompleteDataLoading } =
    useGetReviewAutoCompleteSearch(debouncedQuery);

  const handleBackClick = () => {
    localStorage.removeItem("clacoBookId");
    navigate("/ticketbook");
  };

  const handleConfirmClick = () => {
    localStorage.setItem("showId", selectedShow?.toString() || "");
    navigate("/ticketcreate/info");
  };

  const [autoCompleteList, setAutoCompleteList] = useState<
    AutoCompleteSearchCard[]
  >([]);

  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSkipDebounce(newValue === "");
    setQuery(newValue);
    if (newValue.trim().length === 0) setAutoCompleteList([]);
  };

  useEffect(() => {
    if (skipDebounce) {
      const timer = setTimeout(() => {
        setSkipDebounce(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [skipDebounce]);

  return (
    <div className="relative flex flex-col h-screen px-[24px] pt-[46px] pb-[60px]">
      <div className="flex flex-col gap-[33px]">
        <div className="relative flex items-center justify-center">
          <BackArrow
            width="9"
            height="18"
            viewBox="0 0 11 20"
            className="absolute left-0"
            onClick={handleBackClick}
          />
          <span className="headline2-bold text-grayscale-80">티켓 등록</span>
        </div>
        <Progress value={30} />
        <SearchBar
          ref={searchInputRef}
          value={query}
          onChange={handleSearchChange}
          placeholder={"관람한 공연을 검색해주세요"}
        />
      </div>

      <div className="flex-grow overflow-y-auto hide-scrollbar mt-[20px]">
        <div className="flex flex-col space-y-[11px]">
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
                      onClick={() => setSelectedShow(show.id)}
                      className={`${
                        selectedShow === show.id
                          ? "border-grayscale-80"
                          : "border-grayscale-30"
                      }`}
                    />
                  ))}
                </>
              ) : null}
            </>
          ) : null}
        </div>
        <div className="sticky bottom-0 h-[102px] w-full bg-gradient-to-b from-transparent to-[#1C1C1C] pointer-events-none" />
      </div>

      <ConfirmButton
        isChecked={selectedShow !== null}
        onClick={handleConfirmClick}
        disabled={selectedShow === null}
      >
        다음
      </ConfirmButton>
    </div>
  );
};
