import { client } from "@/apis";
import { TicketReviewDetailResponse } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getTicketReviewDetail = async (ticketReviewId: number) => {
  const response = await client.get<TicketReviewDetailResponse>(
    `/ticket-reviews/${ticketReviewId}`,
  );
  return response.data;
};

const useGetTicketReviewDetail = (
  ticketReviewId: number,
): UseQueryResult<TicketReviewDetailResponse, AxiosError> => {
  return useQuery<TicketReviewDetailResponse, AxiosError>({
    queryKey: ["ticketReviewDetail", ticketReviewId],
    queryFn: () => getTicketReviewDetail(ticketReviewId),
  });
};

export default useGetTicketReviewDetail;
