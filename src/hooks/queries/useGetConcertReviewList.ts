import { client } from "@/apis";
import {
  GetConcertReviewInfiniteResponse,
  GetConcertReviewListProps,
  GetConcertReviewListResponse,
} from "@/types";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

const getConcertReviewList = async ({
  concertId,
  page,
  size = 9,
  orderBy,
}: GetConcertReviewListProps): Promise<GetConcertReviewListResponse> => {
  const response = await client.get<GetConcertReviewListResponse>(
    `/ticket-reviews/concerts/reviews/${concertId}`,
    {
      params: {
        page,
        size,
        orderBy,
      },
    }
  );
  return response.data;
};

const useGetConcertReviewList = ({
  concertId,
  size = 9,
  orderBy,
}: Omit<GetConcertReviewListProps, "page">): UseInfiniteQueryResult<
  GetConcertReviewInfiniteResponse,
  AxiosError
> => {
  return useInfiniteQuery({
    queryKey: ["concert-review-data", orderBy],
    queryFn: ({ pageParam = 1 }) =>
      getConcertReviewList({ concertId, page: pageParam, size, orderBy }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.result.currentPage !== allPages[0].result.totalPage
        ? lastPage.result.currentPage + 1
        : undefined;
    },
  });
};

export default useGetConcertReviewList;

/**
 * No description
 *
 * @tags useGetConcertReviewList
 * @name ticket-review-controller
 * @summary 공연에 작성된 리뷰 목록 조회 api
 * @request GET: /ticket-reviews/concerts/reviews
 * @secure bearer
 */
