import { ReactComponent as ClacoMain } from "@/assets/svgs/Claco_Main.svg";
import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { CategoryTag } from "@/components/common/CategoryTag";
import { ReactComponent as Heart } from "@/assets/svgs/Heart.svg";
import { ReactComponent as Megaphone } from "@/assets/svgs/Megaphone.svg";
import { ReactComponent as Book } from "@/assets/svgs/Book.svg";
import { Genre } from "@/components/common/Genre";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ShowCategory } from "@/types";
import { usePostLike } from "@/hooks/mutation";
import { useConcertInfoStore } from "@/libraries/store/concertInfo";

export type ShowOverViewProps = {
  prfstate: string;
  prfprice: string;
  genrenm: string;
  prfnm: string;
  poster: string;
  area: string;
  prfruntime: string;
  prfage: string;
  prfdate: string;
  summary: string;
  categories: ShowCategory[];
  liked: boolean;
};

const ShowOverview = ({
  prfstate,
  prfage,
  prfruntime,
  genrenm,
  prfnm,
  poster,
  area,
  prfdate,
  prfprice,
  summary,
  categories,
  liked,
}: ShowOverViewProps) => {
  const { setConcertInfo } = useConcertInfoStore();
  useEffect(() => {
    setConcertInfo({
      genrenm,
      prfstate,
      prfnm,
    });
  }, [genrenm, prfstate, prfnm, setConcertInfo]);

  const navigate = useNavigate();
  const [_liked, setLiked] = useState(liked);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const mutation = usePostLike();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (textRef.current) {
      const height = textRef.current.getBoundingClientRect().height;

      setShowButton(height > 40);
    }
  }, [summary]);

  const gotoBack = () => {
    navigate(-1);
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
    mutation.mutate(Number(id));
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="px-6">
      <ClacoMain className="mb-[38px]" />

      <BackArrow
        width="8"
        height="15"
        viewBox="0 0 11 20"
        className="mb-[37px] cursor-pointer"
        onClick={gotoBack}
      />

      <div className="flex space-x-2 mb-[11px]">
        <CategoryTag categoryType={genrenm} />
        <CategoryTag categoryType={prfstate} />
      </div>

      <span className="heading2-bold text-grayscale-80">{prfnm}</span>

      <div className="flex gap-[21px] mt-7">
        <div className="relative w-[130px] h-[173px]">
          <div className="absolute top-0 left-0 w-full h-[70px] bg-gradient-to-b from-[rgba(0,0,0,0.40)] to-[rgba(102,102,102,0.00)] pointer-events-none z-40"></div>
          <div className="absolute top-[10px] right-[10px] z-50">
            <Heart
              className="cursor-pointer"
              fill={_liked ? "#ECEBE7" : "none"}
              onClick={handleLike}
            />
          </div>
          <img
            src={poster}
            alt="poster"
            className="absolute top-0 left-0 z-0 object-cover w-full h-full rounded-[5px]"
          />
        </div>
        <div className="flex flex-col mb-[45px]">
          <div className="flex space-x-[10px] mb-[23px]">
            <div className="flex flex-col space-y-2 caption-13 text-grayscale-70">
              <span>장소</span>
              <span>기간</span>
              <span>시간</span>
              <span>연령</span>
              <span>가격</span>
            </div>
            <div className="flex flex-col space-y-2 caption-13 text-grayscale-80">
              <span>{area}</span>
              <span>{prfdate}</span>
              <span>{prfruntime}</span>
              <span>{prfage}</span>
              <span>{prfprice}</span>
            </div>
          </div>
          <div className="underline cursor-pointer caption-12 text-grayscale-70">
            예매하러가기
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-grayscale-20 rounded-[5px] px-[27px] pt-[30px] pb-[50px] mb-[26px]">
        <div className="flex space-x-2 items-center mb-[18px]">
          <Megaphone />
          <span className="headline2-bold">Claco 쉬운 공연 설명</span>
        </div>

        <div className="flex flex-col items-center justify-center mb-[17px]">
          <p
            ref={textRef}
            className={`body2-medium text-grayscale-70 ${
              showButton && !isExpanded ? "line-clamp-2" : "mb-[15px]"
            }`}
          >
            {summary || ""}
          </p>

          {showButton && (
            <button
              onClick={toggleExpanded}
              className="flex justify-center mt-[15px]"
            >
              <BackArrow
                width="14"
                height="14"
                viewBox="0 0 11 20"
                className={`text-grayscale-60 ${
                  isExpanded ? "rotate-90" : "-rotate-90"
                }`}
              />
            </button>
          )}
        </div>
        <div className="flex space-x-2 items-center mb-[22px]">
          <Book />
          <span className="headline2-bold">이런 느낌의 공연이에요</span>
        </div>
        <div className="flex justify-between px-[13px]">
          {categories?.map((item, index) => (
            <Genre
              key={index}
              genreImgURL={item.imageURL}
              genreKeyword={item.category}
              className="caption-12 text-white w-[43px] h-[43px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowOverview;
