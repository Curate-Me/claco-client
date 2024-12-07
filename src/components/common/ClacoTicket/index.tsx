import { ReactComponent as ClacoTicketContainer } from "@/assets/svgs/Claco_Ticket.svg";
import { Genre } from "@/components/common/Genre";
import { ClacoTicketProps } from "@/types";

export const ClacoTicket = ({
  concertPoster,
  watchDate,
  concertName,
  concertTags,
}: ClacoTicketProps) => {
  const formattedWatchDate = (date: string): string => date.replace(/-/g, ".");

  return (
    <div className="relative w-[213px] h-[471px]">
      <img
        src={concertPoster}
        alt="claco book 포스터 이미지"
        crossOrigin="anonymous"
        className="absolute top-[7.54px] left-[7px] w-[199px] h-[266px] rounded-[5px]"
      />
      <div className="absolute bottom-[110px] left-[11px]">
        <div className="flex-col justify-center w-[195px] text-dark">
          <div className="text-center font-Nonchalance text-[22px]">
            {formattedWatchDate(watchDate)}
          </div>
          <div className="flex items-center justify-center text-center font-medium text-[10px] h-[30px]">
            {concertName}
          </div>
        </div>
      </div>
      <div className="absolute bottom-[55.18px] px-[13px] w-[213px] flex justify-between">
        {concertTags.map((item, index) => (
          <Genre
            key={index}
            genreKeyword={item.tagName}
            className="w-[29px] h-[29px] object-contain text-primary-800 font-medium text-[8px]"
          />
        ))}
      </div>

      <ClacoTicketContainer />
    </div>
  );
};
