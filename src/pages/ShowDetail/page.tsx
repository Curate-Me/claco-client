import AudienceReviews from "@/components/ShowDetail/AudienceReviews";
import { ReactComponent as ClacoMain } from "@/assets/svgs/Claco_Main.svg";
import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import RelatedShowsRecommend from "@/components/ShowDetail/RelatedShowRecommend";
import ShowEssentials from "@/components/ShowDetail/ShowInformation/ShowEssentials";
import ShowOverview from "@/components/ShowDetail/ShowInformation/ShowOverview";
import ShowPoster from "@/components/ShowDetail/ShowInformation/ShowPoster";
import { Skeleton } from "@/components/ui/skeleton";
import useGetShowDetail from "@/hooks/queries/useGetShowDetail";
import {
  extractDateRange,
  extractPricesWithSeats,
  extractSchedule,
  timeToMinutes,
  useDeferredLoading,
} from "@/hooks/utils";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ShowDetailPage = () => {
  const [selectedTab, setSelectedTab] = useState("공연 정보");
  const [isSticky, setIsSticky] = useState(true);
  const [showFullImage, setShowFullImage] = useState(false);

  const tabs = ["공연 정보", "상세정보", "감상 리뷰"];

  const showInfoRef = useRef<HTMLDivElement>(null);
  const detailsInfoRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const relatedShowsRef = useRef<HTMLDivElement>(null);

  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetShowDetail(Number(id));
  const showDetail = data?.result;
  const { seats, prices, minPrice, maxPrice } = extractPricesWithSeats(
    showDetail?.pcseguidance || "",
  );
  const { shouldShowSkeleton } = useDeferredLoading(isLoading);

  useEffect(() => {
    const sectionRefs = {
      "공연 정보": showInfoRef,
      상세정보: detailsInfoRef,
      "감상 리뷰": reviewRef,
    };

    Object.entries(sectionRefs).forEach(([sectionId, ref]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setSelectedTab(sectionId);
            }
          });
        },
        {
          threshold: sectionId === "상세정보" && showFullImage ? 0.2 : 0.7,
        },
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    });

    const currentRelatedShowsRef = relatedShowsRef.current;
    const endObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSticky(false);
          } else {
            setIsSticky(true);
          }
        });
      },
      { threshold: 0.8 },
    );

    if (currentRelatedShowsRef) {
      endObserver.observe(currentRelatedShowsRef);
    }

    return () => {
      if (currentRelatedShowsRef) {
        endObserver.unobserve(currentRelatedShowsRef);
      }
    };
  }, [showFullImage]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    const yOffset = -100;
    if (ref.current) {
      const elementPosition =
        ref.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    if (tab === "공연 정보") {
      scrollToSection(showInfoRef);
    } else if (tab === "상세정보") {
      scrollToSection(detailsInfoRef);
    } else if (tab === "감상 리뷰") {
      scrollToSection(reviewRef);
    }
  };

  const displayedPrice = (
    minPrice: number | string | null,
    maxPrice: number | string | null,
  ): string => {
    if (minPrice === "무료" && maxPrice === "무료") {
      return "무료";
    }
    if (minPrice !== null && maxPrice !== null) {
      return minPrice === maxPrice
        ? `${minPrice.toLocaleString()}원`
        : `${minPrice.toLocaleString()}원-${maxPrice.toLocaleString()}원`;
    }
    return "";
  };

  if (isLoading || shouldShowSkeleton) {
    return (
      <div className="relative flex flex-col min-h-screen px-6 pt-[73px] pb-[60px]">
        <ClacoMain className="mb-[38px]" />
        <BackArrow
          width="8"
          height="15"
          viewBox="0 0 11 20"
          className="mb-[37px] cursor-pointer"
        />
        <Skeleton className="w-[100px] h-[26px] mb-[11px]" />
        <Skeleton className="w-[299px] h-[30px] mb-[28px]" />
        <Skeleton className="w-full h-[173px] mb-[45px]" />
        <Skeleton className="w-full h-[295px] mb-[66px]" />
        <Skeleton className="w-full h-[40px] mb-[40px]" />
      </div>
    );
  }
  return (
    <div className="pt-[73px] pb-[40px]">
      <ShowOverview
        prfstate={showDetail?.prfstate || ""}
        prfprice={displayedPrice(minPrice, maxPrice)}
        genrenm={showDetail?.genrenm || ""}
        prfnm={showDetail?.prfnm || ""}
        poster={showDetail?.poster || ""}
        area={showDetail?.area || ""}
        prfruntime={timeToMinutes(
          showDetail?.prfruntime || "",
        )}
        prfage={showDetail?.prfage || ""}
        prfdate={extractDateRange(
          showDetail?.prfpdfrom || "",
          showDetail?.prfpdto || "",
        )}
        summary={showDetail?.summary || ""}
        categories={showDetail?.categories || []}
        liked={!!showDetail?.liked}
      />

      <div
        className={`bg-dark w-full pt-8 ${!isSticky ? "" : "sticky top-0 z-50"}`}
      >
        <div className="flex flex-col items-center justify-center px-[24px] mb-[49px]">
          <div className="relative flex justify-between w-full mb-[14px] px-[15px]">
            {tabs.map((tab) => (
              <span
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`text-center cursor-pointer pb-2 ${
                  selectedTab === tab
                    ? "body2-semibold text-grayscale-80 border-b-2 border-grayscale-80 z-10"
                    : "body2-medium text-grayscale-60 border-b-2 border-grayscale-30"
                }`}
              >
                {tab}
              </span>
            ))}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-grayscale-30" />
          </div>
        </div>
      </div>

      <div ref={showInfoRef} data-section-id="공연 정보">
        <ShowEssentials
          fcltynm={showDetail?.fcltynm || ""}
          prfruntime={timeToMinutes(
            showDetail?.prfruntime || "",
          )}
          prfdate={extractDateRange(
            showDetail?.prfpdfrom || "",
            showDetail?.prfpdto || "",
          )}
          dtguidance={extractSchedule(showDetail?.dtguidance || "")}
          seats={seats}
          prices={prices}
        />
      </div>
      <div ref={detailsInfoRef} data-section-id="상세정보">
        <ShowPoster
          showFullImage={showFullImage}
          setShowFullImage={setShowFullImage}
          styurl={showDetail?.styurl || ""}
        />
      </div>
      <div ref={reviewRef} data-section-id="감상 리뷰">
        <AudienceReviews
          reviews={showDetail?.ticketReviewSimpleResponses || []}
        />
      </div>

      <div ref={relatedShowsRef}>
        <RelatedShowsRecommend />
      </div>
    </div>
  );
};
