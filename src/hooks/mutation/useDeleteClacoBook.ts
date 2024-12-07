import { client } from "@/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteClacoBook = async (bookId: number) => {
  const res = await client.delete(`/claco-books/claco-book/${bookId}`);
  return res.data;
};

const useDeleteClacoBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClacoBook,
    onSuccess: (res) => {
      if (res.code === "COM-000") {
        console.log("클라코북 삭제 성공");
        queryClient.invalidateQueries({ queryKey: ["clacoBookList"] });
      } else {
        console.log("클라코북을 삭제하는 도중 에러가 발생했습니다.");
      }
    },
    onError: (error) => {
      console.error("클라코북 생성 실패", error);
    },
  });
};

export default useDeleteClacoBook;
