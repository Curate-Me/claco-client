import { client } from "@/apis";
import { useMutation } from "@tanstack/react-query";

export type TicketImageRequest = {
  id: number;
  file: File;
};

export type TicketImageURL = {
  imageUrl: string;
};

export type TicketImageResponse = {
  code: string;
  message: string;
  result: TicketImageURL;
  refreshed: boolean;
};

const putTicketImage = async (
  request: TicketImageRequest
): Promise<TicketImageResponse> => {
  const formData = new FormData();
  formData.append("file", request.file);

  const response = await client.put<TicketImageResponse>(
    `/ticket-reviews/ticket-images?id=${request.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

const usePutTicketImage = () => {
  // const queryClient = useQueryClient();
  return useMutation<TicketImageResponse, Error, TicketImageRequest>({
    mutationFn: putTicketImage,
    onSuccess: () => {
      // console.log(data);
      // queryClient.invalidateQueries({ queryKey: ["ticketReviewDetail"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default usePutTicketImage;
