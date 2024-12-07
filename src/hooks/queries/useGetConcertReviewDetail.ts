import { client } from "@/apis";
import { GetConcertReviewDetailResponse } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getConcertReviewDetail = async (
  reviewId: number
): Promise<GetConcertReviewDetailResponse> => {
  const response = await client.get<GetConcertReviewDetailResponse>(
    `/ticket-reviews/reviews/${reviewId}`
  );
  return response.data;
};

const useGetConcertReviewDetail = (
  reviewId: number
): UseQueryResult<GetConcertReviewDetailResponse, AxiosError> => {
  return useQuery<GetConcertReviewDetailResponse, AxiosError>({
    queryKey: ["concert-review-detail", reviewId],
    queryFn: () => getConcertReviewDetail(reviewId),
  });
};

export default useGetConcertReviewDetail;
