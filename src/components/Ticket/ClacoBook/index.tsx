import ClacoBook_Gray from "@/assets/images/ClacoBook/ClcaoBook_Gray.png";
import ClacoBook_Orange from "@/assets/images/ClacoBook/ClcaoBook_Orange.png";
import ClacoBook_Pink from "@/assets/images/ClacoBook/ClcaoBook_Pink.png";
import { useEffect, useState } from "react";

export type ClacoBookType = {
  id: number | null;
  title: string;
  color: string;
};

export type ClacoBookProps = {
  data: ClacoBookType;
  isEditing: boolean;
  children: React.ReactNode;
};

export const ClacoBook = ({ data, isEditing, children }: ClacoBookProps) => {
  const [clacoBookImage, setClacoBookImage] = useState<string>(ClacoBook_Gray);

  useEffect(() => {
    if (data.color === "#DD6339") setClacoBookImage(ClacoBook_Orange);
    else if (data.color === "#D499B8") setClacoBookImage(ClacoBook_Pink);
    else setClacoBookImage(ClacoBook_Gray);
  }, [data.color]);

  return (
    <div className="relative">
      {isEditing ? (
        <div className="absolute top-[24px] left-[20px]">{children}</div>
      ) : null}
      <div className="absolute body1-medium text-primary-50 top-[35px] w-[342px] text-center">
        {data.title}
      </div>
      <img
        src={clacoBookImage}
        alt="클라코북 이미지"
        className="w-[342px] h-[212px] object-contain"
        loading="lazy"
      />
    </div>
  );
};
