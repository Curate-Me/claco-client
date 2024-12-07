import { TextReview } from "./TextReview";
import { ImageReview } from "./ImageReview";
import { ReviewContentProps } from "@/types";

export const ReviewContents = ({
  value,
  onChange,
  files,
  onFileChange,
}: ReviewContentProps) => {
  return (
    <>
      <TextReview value={value} onChange={onChange} />
      <ImageReview files={files} onFileChange={onFileChange} />
    </>
  );
};
