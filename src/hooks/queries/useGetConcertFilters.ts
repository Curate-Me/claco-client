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
}: Omit<GetConcertFiltersProps, "page">): UseInfiniteQueryResult<
  GetConcertInfiniteResponse,
  AxiosError
> => {
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
      const totalPages = Math.ceil(
        lastPage.result.totalCount / lastPage.result.size
      );
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });
};

export default useGetConcertFilters;
