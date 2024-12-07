import { client } from "@/apis";
import { ConcertBasedResponse } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getConcertBased = async (
  concertId: number,
): Promise<ConcertBasedResponse> => {
  const response = await client.get<ConcertBasedResponse>(
    `/recommendations/concertbased?concertId=${concertId}`,
  );
  return response.data;
};

const useGetConcertBased = (
  concertId: number,
): UseQueryResult<ConcertBasedResponse, AxiosError> => {
  return useQuery<ConcertBasedResponse, AxiosError>({
    queryKey: ["concertBased", concertId],
    queryFn: () => getConcertBased(concertId),
  });
};

export default useGetConcertBased;
