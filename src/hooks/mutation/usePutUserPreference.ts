import { client } from "@/apis";
import { UserPreferencesPutRequest, UserPreferencesPutResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const putUserPreference = async (
  preferences: UserPreferencesPutRequest
): Promise<UserPreferencesPutResponse> => {
  const response = await client.put<UserPreferencesPutResponse>(
    `/preferences`,
    preferences
  );
  return response.data;
};

const usePutUserPreference = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation<
    UserPreferencesPutResponse,
    Error,
    UserPreferencesPutRequest
  >({
    mutationFn: putUserPreference,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPreferences"] });
      navigate("/mypage");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default usePutUserPreference;
