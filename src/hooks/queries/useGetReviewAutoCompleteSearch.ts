import { client } from "@/apis";
import { AutoCompleteSearchResponse } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getReviewAutoCompleteSearch = async (
  query: string,
): Promise<AutoCompleteSearchResponse> => {
  const response = await client.get<AutoCompleteSearchResponse>(
    "/concerts/reviews/search",
    {
      params: {
        query: query,
      },
    },
  );
  return response.data;
};

const useGetReviewAutoCompleteSearch = (
  query: string,
): UseQueryResult<AutoCompleteSearchResponse, AxiosError> => {
  return useQuery<AutoCompleteSearchResponse, AxiosError>({
    queryKey: ["useReviewAutoComplete", query],
    queryFn: () => getReviewAutoCompleteSearch(query),
    enabled: query.trim().length !== 0,
  });
};

export default useGetReviewAutoCompleteSearch;
