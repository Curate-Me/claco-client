import { client } from "@/apis";
import { AutoCompleteSearchResponse } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getAutoCompleteSearch = async (
  query: string
): Promise<AutoCompleteSearchResponse> => {
  const response = await client.get<AutoCompleteSearchResponse>(
    "/concerts/search",
    {
      params: {
        query: query,
      },
    }
  );
  return response.data;
};

const useGetAutoCompleteSearch = (
  query: string
): UseQueryResult<AutoCompleteSearchResponse, AxiosError> => {
  return useQuery<AutoCompleteSearchResponse, AxiosError>({
    queryKey: ["useAutoComplete", query],
    queryFn: () => getAutoCompleteSearch(query),
    enabled: query.trim().length !== 0,
  });
};

export default useGetAutoCompleteSearch;

/**
 * No description
 *
 * @tags useGetAutoCompleteSearch
 * @name concert-controller
 * @summary 검색어 디바운스 쿼리에 따른 자동완성 목록 불러오는 API
 * @request GET:/concerts/search
 * @secure bearer
 */
