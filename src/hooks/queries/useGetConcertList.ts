import { client } from "@/apis";
import {
  GetConcertInfiniteResponse,
  GetConcertListProps,
  GetConcertListResponse,
} from "@/types";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

const getConcertsList = async ({
  genre,
  page,
  size = 9,
}: GetConcertListProps): Promise<GetConcertListResponse> => {
  const response = await client.get<GetConcertListResponse>(`/concerts/views`, {
    params: {
      genre,
      page,
      size,
    },
  });
  return response.data;
};

const useGetConcertsList = ({
  genre,
  size = 9,
  enabled = true,
}: Omit<GetConcertListProps, "page"> & {
  enabled?: boolean;
}): UseInfiniteQueryResult<GetConcertInfiniteResponse, AxiosError> => {
  return useInfiniteQuery({
    queryKey: ["concert-data", genre],
    queryFn: ({ pageParam = 1 }) =>
      getConcertsList({ genre, page: pageParam, size }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.result.currentPage !== allPages[0].result.totalPage
        ? lastPage.result.currentPage + 1
        : undefined;
    },
    enabled,
  });
};

export default useGetConcertsList;

/**
 * No description
 *
 * @tags useGetInfiniteConcerts
 * @name concert-controller
 * @summary 둘러보기 공연 조회 API
 * @request GET: /concerts/views
 * @secure bearer
 */
