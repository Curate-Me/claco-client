import { ReactComponent as Heart } from "@/assets/svgs/Heart.svg";
import { CategoryTag } from "@/components/common/CategoryTag";
import { UserBased } from "@/types";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { usePostLike } from "@/hooks/mutation";

export type MainPosterCardProps = {
  data: UserBased;
};

export const MainPosterCard = ({ data }: MainPosterCardProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  const { mutate: postLike } = usePostLike();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldLoad) {
          setShouldLoad(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = posterRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [shouldLoad]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const gotoShowDetail = () => {
    navigate(`/show/${data.id}`);
  };

  const handleLikeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    postLike(data.id, {
      onSuccess: () => {},
      onError: (error) => console.error(error),
    });
  };

  return (
    <div
      ref={posterRef}
      className="relative w-[342px] h-[443px] rounded-[5px]"
      onClick={gotoShowDetail}
    >
      <button
        className="absolute top-[26px] right-[19px] z-20"
        onClick={(e) => handleLikeButton(e)}
      >
        {data.liked ? (
          <Heart
            className="fill-grayscale-80"
            width="22"
            height="18"
            viewBox="0 0 15 13"
          />
        ) : (
          <Heart
            className="fill-none"
            width="22"
            height="18"
            viewBox="0 0 15 13"
          />
        )}
      </button>

      {isLoading && (
        <div className="absolute top-0 left-0 z-0 w-full h-full rounded-[5px] bg-grayscale-20 animate-pulse" />
      )}

      <img
        src={shouldLoad ? data.poster : ""}
        alt="poster"
        loading="lazy"
        onLoad={handleImageLoad}
        className={`absolute top-0 left-0 z-0 object-cover w-full h-full rounded-[5px] transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />

      <div className="rounded-[5px] absolute top-0 left-0 z-10 w-full h-full bg-gradient-to-b from-common-black/20 from-0% to-common-black to-64% opacity-60"></div>
      <div className="rounded-[5px] absolute bottom-0 left-0 z-10 w-full h-[189px] bg-gradient-to-b from-background-dark/0 to-background-dark/100">
        <div className="flex items-center space-x-[10px] absolute bottom-6 left-[11px]">
          <CategoryTag categoryType={data.genrenm} />
          <div className="heading2-bold text-grayscale-80 truncate max-w-[220px]">
            {data.prfnm}
          </div>
        </div>
      </div>
    </div>
  );
};
