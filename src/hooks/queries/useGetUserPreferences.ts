import { client } from "@/apis";
import { UserPreferencesResponse } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getUserPreferences = async (): Promise<UserPreferencesResponse> => {
  const response = await client.get<UserPreferencesResponse>("/preferences");
  return response.data;
};

const useGetUserPreferences = (): UseQueryResult<
  UserPreferencesResponse,
  AxiosError
> => {
  return useQuery<UserPreferencesResponse, AxiosError>({
    queryKey: ["userPreferences"],
    queryFn: getUserPreferences,
  });
};

export default useGetUserPreferences;
