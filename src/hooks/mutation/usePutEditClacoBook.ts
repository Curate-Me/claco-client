import { client } from "@/apis";
import { ClacoBookList, ClacoBookListResponse } from "@/types";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const editClacoBook = async (
  clacobook: ClacoBookList
): Promise<ClacoBookListResponse> => {
  const res: AxiosResponse<ClacoBookListResponse> =
    await client.put<ClacoBookListResponse>("/claco-books", clacobook);
  return res.data;
};

const usePutEditClacoBook = (): UseMutationResult<
  ClacoBookListResponse,
  AxiosError,
  ClacoBookList
> => {
  const queryClient = useQueryClient();
  return useMutation<ClacoBookListResponse, AxiosError, ClacoBookList>({
    mutationFn: editClacoBook,
    onSuccess: (res) => {
      if (res.code === "COM-000") {
        console.log("클라코북 수정 성공");
        queryClient.invalidateQueries({ queryKey: ["clacoBookList"] });
      } else if (res.code === "CLB-001") {
        console.log("클라코북을 수정하는 중에 문제가 발생했어요");
      }
    },
    onError: (error) => {
      console.error("클라코북 수정 실패", error);
    },
  });
};

export default usePutEditClacoBook;
