import { client } from "@/apis";
import { GetLikedConcertListResponse, GetSearchProps } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getConcertLikes = async ({
  query,
  genre,
}: GetSearchProps): Promise<GetLikedConcertListResponse> => {
  const response = await client.get<GetLikedConcertListResponse>(
    "/concerts/likes",
    {
      params: {
        query: query,
        genre: genre,
      },
    },
  );
  return response.data;
};

const useGetConcertLikes = ({
  query,
  genre,
}: GetSearchProps): UseQueryResult<GetLikedConcertListResponse, AxiosError> => {
  return useQuery<GetLikedConcertListResponse, AxiosError>({
    queryKey: ["search-liked-concert-data", query],
    queryFn: () => getConcertLikes({ query, genre }),
    enabled: query.trim().length !== 0,
  });
};

export default useGetConcertLikes;
