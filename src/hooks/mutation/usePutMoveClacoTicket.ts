import { client } from "@/apis";
import { ClacoBookListResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export type MoveClacoTicketProps = {
  ticketReviewId: number;
  clacoBookId: number;
};

const moveClacoTicket = async ({
  ticketReviewId,
  clacoBookId,
}: MoveClacoTicketProps): Promise<ClacoBookListResponse> => {
  const res: AxiosResponse<ClacoBookListResponse> =
    await client.put<ClacoBookListResponse>(
      `/ticket-reviews/${ticketReviewId}/claco-books/${clacoBookId}`
    );
  return res.data;
};

const usePutMoveClacoTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: moveClacoTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clacoTicketList"] });
      queryClient.invalidateQueries({ queryKey: ["clacoBookList"] });
    },
    onError: (error) => {
      console.error("클라코 티켓 폴더 이동 실패", error);
    },
  });
};

export default usePutMoveClacoTicket;
