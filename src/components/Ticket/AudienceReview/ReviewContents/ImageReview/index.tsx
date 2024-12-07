import { ReactComponent as Plus } from "@/assets/svgs/plus.svg";
import { ImageReviewProps } from "@/types";

export const ImageReview = ({ files, onFileChange }: ImageReviewProps) => {
  return (
    <div className="flex flex-col mt-[40px] mb-8">
      <span className="headline2-bold text-grayscale-80">
        사진 또는 비디오를 첨부해 <br />
        보다 생생한 리뷰를 공유해주세요.
      </span>
      <div className="flex gap-3 mt-5">
        {files.length < 3 && (
          <label className="w-[84px] h-[84px] bg-grayscale-30 rounded-[5px] flex items-center justify-center flex-col cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={onFileChange}
              className="hidden"
            />
            <Plus className="text-grayscale-60" />
            <span className="text-grayscale-60 caption-12">
              {files.length}/3
            </span>
          </label>
        )}

        {files.map((file, index) => (
          <div
            key={index}
            className="w-[84px] h-[84px] rounded-[5px] overflow-hidden"
          >
            {file.type.startsWith("image") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <video
                src={URL.createObjectURL(file)}
                controls
                className="object-cover w-full h-full"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
