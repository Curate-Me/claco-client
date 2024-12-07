import { client } from "@/apis";
import { ClacoTicketListResponse } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getClacoTicketList = async (
  clacoBookId: number
): Promise<ClacoTicketListResponse> => {
  const response = await client.get<ClacoTicketListResponse>(
    `/ticket-reviews/claco-books/${clacoBookId}`
  );
  return response.data;
};

const useGetClacoTicketList = (
  clacoBookId: number
): UseQueryResult<ClacoTicketListResponse, AxiosError> => {
  return useQuery<ClacoTicketListResponse, AxiosError>({
    queryKey: ["clacoTicketList", clacoBookId],
    queryFn: () => getClacoTicketList(clacoBookId),
  });
};

export default useGetClacoTicketList;
