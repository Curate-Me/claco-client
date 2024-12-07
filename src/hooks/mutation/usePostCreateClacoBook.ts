import { client } from "@/apis";
import { ClacoBookList, ClacoBookListResponse } from "@/types";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const createClacoBook = async (
  clacobook: ClacoBookList
): Promise<ClacoBookListResponse> => {
  const res: AxiosResponse<ClacoBookListResponse> =
    await client.post<ClacoBookListResponse>("/claco-books", clacobook);
  return res.data;
};

const usePostCreateClacoBook = (): UseMutationResult<
  ClacoBookListResponse,
  AxiosError,
  ClacoBookList
> => {
  const queryClient = useQueryClient();
  return useMutation<ClacoBookListResponse, AxiosError, ClacoBookList>({
    mutationFn: createClacoBook,
    onSuccess: (res) => {
      if (res.code === "COM-000") {
        console.log("클라코북 생성 성공");
        queryClient.invalidateQueries({ queryKey: ["clacoBookList"] });
      } else if (res.code === "CLB-010") {
        console.log("클라코북은 최대 5개까지만 보유할 수 있습니다");
      }
    },
    onError: (error) => {
      console.error("클라코북 생성 실패", error);
    },
  });
};

export default usePostCreateClacoBook;
