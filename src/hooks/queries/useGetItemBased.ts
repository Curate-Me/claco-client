import { client } from "@/apis";
import { UserItemBasedResponse } from "@/types";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getItemBased = async (): Promise<UserItemBasedResponse> => {
  const response = await client.get<UserItemBasedResponse>(
    "/recommendations/itembased"
  );
  return response.data;
};

const useGetItemBased = (): UseQueryResult<
  UserItemBasedResponse,
  AxiosError
> => {
  return useQuery<UserItemBasedResponse, AxiosError>({
    queryKey: ["itemBased"],
    queryFn: getItemBased,
  });
};

export default useGetItemBased;
