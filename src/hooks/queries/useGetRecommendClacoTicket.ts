import { client } from "@/apis";
import { UserRecClacoTicketResponse } from "@/types";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getRecommendClacoTicket =
  async (): Promise<UserRecClacoTicketResponse> => {
    const response = await client.get<UserRecClacoTicketResponse>(
      "/recommendations/clacobooks"
    );
    return response.data;
  };

const useGetRecommendClacoTicket = (): UseQueryResult<
  UserRecClacoTicketResponse,
  AxiosError
> => {
  return useQuery<UserRecClacoTicketResponse, AxiosError>({
    queryKey: ["recommend-clacoticket"],
    queryFn: getRecommendClacoTicket,
  });
};

export default useGetRecommendClacoTicket;
