import { client } from "@/apis";
import { GetConcertReviewSizeResponse } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getConcertReviewSize = async (
  concertId: number
): Promise<GetConcertReviewSizeResponse> => {
  const response = await client.get<GetConcertReviewSizeResponse>(
    `/ticket-reviews/concerts/${concertId}/size`
  );
  return response.data;
};

const useGetConcertReviewSize = (
  concertId: number
): UseQueryResult<GetConcertReviewSizeResponse, AxiosError> => {
  return useQuery<GetConcertReviewSizeResponse, AxiosError>({
    queryKey: ["concert-review-size", concertId],
    queryFn: () => getConcertReviewSize(concertId),
  });
};

export default useGetConcertReviewSize;
