import { client } from "@/apis";
import { UserBasedResponse } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getUserBased = async (): Promise<UserBasedResponse> => {
  const response = await client.get<UserBasedResponse>(
    "/recommendations/userbased"
  );
  return response.data;
};

const useGetUserBased = (): UseQueryResult<UserBasedResponse, AxiosError> => {
  return useQuery<UserBasedResponse, AxiosError>({
    queryKey: ["userBased"],
    queryFn: getUserBased,
  });
};

export default useGetUserBased;
