import { client } from "@/apis";
import {
  EditClacoTicketReviewProps,
  EditClacoTicketReviewResponse,
} from "@/types";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const editClacoTicketReview = async (
  editData: EditClacoTicketReviewProps
): Promise<EditClacoTicketReviewResponse> => {
  const res: AxiosResponse<EditClacoTicketReviewResponse> =
    await client.put<EditClacoTicketReviewResponse>(
      "/ticket-reviews",
      editData
    );
  return res.data;
};

const usePutEditTicketReview = (): UseMutationResult<
  EditClacoTicketReviewResponse,
  AxiosError,
  EditClacoTicketReviewProps
> => {
  const queryClient = useQueryClient();
  return useMutation<
    EditClacoTicketReviewResponse,
    AxiosError,
    EditClacoTicketReviewProps
  >({
    mutationFn: editClacoTicketReview,
    onSuccess: (res) => {
      if (res.code === "COM-000") {
        console.log("클라코 티켓 리뷰 수정 성공");
        queryClient.invalidateQueries({ queryKey: ["ticketReviewDetail"] });
      } else if (res.code === "TCK-001") {
        console.log("클라코 티켓 리뷰를 찾을 수 없습니다");
      } else if (res.code === "MEM-999") {
        console.log("해당 리뷰의 작성자가 아닙니다.");
      } else {
        console.log("클라코 티켓 리뷰 수정 중에 문제가 발생했습니다.");
      }
    },
    onError: (error) => {
      console.error("클라코 티켓 리뷰 수정 실패", error);
    },
  });
};

export default usePutEditTicketReview;
