import { AIRecommend } from "./AIRecommend";
import { SimilarKeyWordRecommend } from "./SimilarKeyWordRecommend";
import { TicketRecommend } from "./TicketRecommend";

export const Analysis = () => {
  return (
    <div>
      <AIRecommend />
      <SimilarKeyWordRecommend />
      <TicketRecommend />
    </div>
  );
};
