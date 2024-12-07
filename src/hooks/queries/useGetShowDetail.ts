import { client } from "@/apis";
import { ShowDetailCheckResponse } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getShowDetail = async (showId: number) => {
  const response = await client.get<ShowDetailCheckResponse>(
    `/concerts/details/${showId}`,
  );
  return response.data;
};

const useGetShowDetail = (
  showId: number,
): UseQueryResult<ShowDetailCheckResponse, AxiosError> => {
  return useQuery<ShowDetailCheckResponse, AxiosError>({
    queryKey: ["showDetail", showId],
    queryFn: () => getShowDetail(showId),
  });
};

export default useGetShowDetail;
