import { ReactComponent as BackArrow } from "@/assets/svgs/BackArrow.svg";
import { forwardRef, useRef, useState } from "react";

export type DetailsInfoSectionProps = {
  showFullImage: boolean;
  setShowFullImage: (show: boolean) => void;
  styurl: string;
};

const ShowPoster = forwardRef<HTMLDivElement, DetailsInfoSectionProps>(
  ({ showFullImage, setShowFullImage, styurl }, ref) => {
    const [isImageOverflow, setIsImageOverflow] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    const checkImageHeight = () => {
      if (imageRef.current) {
        const imageHeight = imageRef.current.naturalHeight;
        setIsImageOverflow(imageHeight > 4000);
      }
    };

    const toggleFullImageView = () => {
      setShowFullImage(!showFullImage);
    };

    return (
      <section ref={ref}>
        <div className="px-6 pb-[73px]">
          <span className="headline2-bold text-grayscale-80">상세정보</span>
          <div className="flex flex-col items-center space-y-[22px]">
            <div
              className={`mt-6 w-[350px] rounded-t-[5px] ${
                showFullImage ? "max-h-none" : "max-h-[629px] overflow-hidden"
              }`}
            >
              <img
                ref={imageRef}
                src={styurl}
                alt="poster details"
                className="w-full h-auto object-cover rounded-[5px]"
                onLoad={checkImageHeight}
              />
            </div>
            {isImageOverflow && (
              <BackArrow
                width="7"
                height="13"
                viewBox="0 0 11 20"
                className={`cursor-pointer ${
                  showFullImage ? "rotate-90" : "-rotate-90"
                }`}
                onClick={toggleFullImageView}
              />
            )}
          </div>
        </div>
      </section>
    );
  },
);

export default ShowPoster;
