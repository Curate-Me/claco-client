import { client } from "@/apis";
import {
  GetConcertFiltersProps,
  GetConcertInfiniteResponse,
  GetConcertListResponse,
} from "@/types";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

const getConcertFilters = async ({
  minPrice,
  maxPrice,
  area,
  startDate,
  endDate,
  page,
  size = 9,
  categories,
}: GetConcertFiltersProps) => {
  const response = await client.get<GetConcertListResponse>(
    "/concerts/filters",
    {
      params: {
        minPrice,
        maxPrice,
        area,
        startDate,
        endDate,
        page,
        size,
        categories,
      },
      paramsSerializer: {
        indexes: null,
      },
    }
  );
  return response.data;
};

const useGetConcertFilters = ({
  minPrice,
  maxPrice,
  area,
  startDate,
  endDate,
  size = 9,
  categories,
  enabled = false,
}: Omit<GetConcertFiltersProps, "page"> & {
  enabled?: boolean;
}): UseInfiniteQueryResult<GetConcertInfiniteResponse, AxiosError> => {
  return useInfiniteQuery({
    queryKey: [
      "concert-filter",
      minPrice,
      maxPrice,
      area,
      startDate,
      endDate,
      categories,
    ],
    queryFn: ({ pageParam }) =>
      getConcertFilters({
        minPrice,
        maxPrice,
        area,
        startDate,
        endDate,
        page: pageParam,
        size,
        categories,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.result.currentPage !== allPages[0].result.totalPage
        ? lastPage.result.currentPage + 1
        : undefined;
    },
    enabled,
  });
};

export default useGetConcertFilters;
