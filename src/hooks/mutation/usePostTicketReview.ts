import { client } from "@/apis";
import { TicketReviewRequest, TicketReviewResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const postTicketReview = async (
  request: TicketReviewRequest
): Promise<TicketReviewResponse> => {
  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify(request)], {
      type: "application/json",
    })
  );

  if (request.files.length == 0) {
    formData.append("files", "");
  } else {
    request.files.forEach((file: File) => {
      formData.append("files", file);
    });
  }

  const response = await client.post<TicketReviewResponse>(
    "/ticket-reviews",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

const usePostTicketReview = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation<TicketReviewResponse, Error, TicketReviewRequest>({
    mutationFn: postTicketReview,
    onSuccess: (data) => {
      console.log(data);
      localStorage.removeItem("showDate");
      localStorage.removeItem("showTime");
      localStorage.removeItem("showPlace");
      localStorage.removeItem("seat");
      localStorage.removeItem("castingList");
      const ticketReviewId = data.result?.ticketReviewId;
      if (ticketReviewId) {
        localStorage.setItem("ticketReviewId", ticketReviewId.toString());
      }
      queryClient.invalidateQueries({ queryKey: ["clacoTicketList"] });
      navigate("/ticketcreate/download");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default usePostTicketReview;
