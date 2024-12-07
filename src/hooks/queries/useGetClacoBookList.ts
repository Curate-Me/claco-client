import { client } from "@/apis";
import { ClacoBookListResponse } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getClacoBookList = async (): Promise<ClacoBookListResponse> => {
  const response = await client.get<ClacoBookListResponse>("/claco-books");
  return response.data;
};

const useGetClacoBookList = (): UseQueryResult<
  ClacoBookListResponse,
  AxiosError
> => {
  return useQuery<ClacoBookListResponse, AxiosError>({
    queryKey: ["clacoBookList"],
    queryFn: () => getClacoBookList(),
  });
};

export default useGetClacoBookList;
