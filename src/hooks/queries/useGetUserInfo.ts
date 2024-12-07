import { client } from "@/apis";
import { UserInfoResponse } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getUserInfo = async (): Promise<UserInfoResponse> => {
  const response = await client.get<UserInfoResponse>("/members");
  return response.data;
};

const useGetUserInfo = (): UseQueryResult<UserInfoResponse, AxiosError> => {
  return useQuery<UserInfoResponse, AxiosError>({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });
};

export default useGetUserInfo;
