import { client } from "@/apis";
import {
  GetConcertInfiniteResponse,
  GetConcertListResponse,
  GetSearchProps,
} from "@/types";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

const getSearch = async ({
  query,
  page,
  size = 9,
}: GetSearchProps): Promise<GetConcertListResponse> => {
  const response = await client.get<GetConcertListResponse>(
    "/concerts/queries",
    {
      params: {
        query: query,
        page: page,
        size: size,
      },
    }
  );
  return response.data;
};

const useGetSearch = ({
  query,
  size = 9,
}: Omit<GetSearchProps, "page">): UseInfiniteQueryResult<
  GetConcertInfiniteResponse,
  AxiosError
> => {
  return useInfiniteQuery({
    queryKey: ["search-concert-data", query],
    queryFn: ({ pageParam }) => getSearch({ query, page: pageParam, size }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.result.currentPage !== allPages[0].result.totalPage
        ? lastPage.result.currentPage + 1
        : undefined;
    },
  });
};

export default useGetSearch;

/**
 * No description
 *
 * @tags useGetSearch
 * @name concert-controller
 * @summary 검색 API
 * @request GET:/concerts/queries
 * @secure bearer
 */
