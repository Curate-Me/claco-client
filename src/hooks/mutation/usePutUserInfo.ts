import { client } from "@/apis";
import { UserInfoRequest, UserInfoResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const putUserInfo = async (
  request: UserInfoRequest,
): Promise<UserInfoResponse> => {
  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify(request)], {
      type: "application/json",
    }),
  );

  formData.append("updateNickname", request.updateNickname || "");

  if (request.updateImage) {
    formData.append("updateImage", request.updateImage);
  } else {
    formData.append("files", "");
  }

  const response = await client.put<UserInfoResponse>(`/members`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const usePutUserInfo = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<UserInfoResponse, Error, UserInfoRequest>({
    mutationFn: putUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userInfo"],
      });
      navigate("/mypage");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default usePutUserInfo;
