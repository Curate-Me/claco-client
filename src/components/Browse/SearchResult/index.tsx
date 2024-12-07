import { GetConcertInfiniteResponse } from "@/types";
import { ClacoPick } from "../ClacoPick";
import { ShowSummaryCard } from "@/components/common/ShowSummaryCard";

export type SearchReultProps = {
  searchData: GetConcertInfiniteResponse;
  isFetchingNextPage: boolean;
};

export const SearchResult = ({
  searchData,
  isFetchingNextPage,
}: SearchReultProps) => {
  return (
    // 검색 이후 로직
    <>
      <div className="flex flex-col gap-[29px] mt-[12px]">
        {searchData?.pages[0].result.totalCount === 0 ? (
          <div className="flex flex-col items-center mt-[121px]">
            <div className="flex flex-col gap-1 mb-[112px]">
              <span className="headline1-bold text-grayscale-90">
                찾으시는 공연 정보가 없어요
              </span>
              <span className="caption-13 text-grayscale-50">
                입력하신 단어가 정확한지 확인해주세요
              </span>
            </div>

            <div className="w-full max-w-screen-sm">
              <ClacoPick
                pickData={
                  searchData.pages[0].result.listPageResponse[0]
                    .recommendationConcertsResponseV1s || []
                }
              />
            </div>
          </div>
        ) : (
          <>
            <span className="headline1-bold">
              총 {searchData?.pages[0].result.totalCount}개의 공연
            </span>
            {searchData &&
              searchData.pages.flatMap((page) =>
                page.result.listPageResponse.map((show) => (
                  <ShowSummaryCard key={show.id} data={show} />
                ))
              )}
            {/* 추가 데이터 로드 */}
            {isFetchingNextPage && (
              <div className="mt-4 text-center">
                <span>로딩 중...</span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
