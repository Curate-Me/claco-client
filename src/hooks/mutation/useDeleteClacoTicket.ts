import { client } from "@/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteClacoTicket = async (ticketReviewId: number) => {
  const res = await client.delete(`/ticket-reviews/${ticketReviewId}`);
  return res.data;
};

const useDeleteClacoTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClacoTicket,
    onSuccess: (res) => {
      if (res.code === "COM-000") {
        console.log("클라코 티켓 삭제 성공");
        queryClient.invalidateQueries({ queryKey: ["clacoTicketList"] });
      } else if (res.code === "TCK-001") {
        console.log("클라코 티켓을 찾을 수 없습니다.");
      } else if (res.code === "MEM-999") {
        console.log("해당 클라코 티켓의 소유주가 아니라 삭제할 수 없습니다.");
      } else {
        console.log("클라코 티켓을 삭제하는데 오류가 발생했습니다.");
      }
    },
    onError: (error) => {
      console.error("클라코 티켓 삭제 실패", error);
    },
  });
};

export default useDeleteClacoTicket;
