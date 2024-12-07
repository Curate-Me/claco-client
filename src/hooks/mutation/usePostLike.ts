import { client } from "@/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type Like = {
  likeId: number;
  liked: boolean;
};

const postLike = async (concertId: number) => {
  const response = await client.post(`/concerts/likes/${concertId}`, {});
  return response.data;
};

const usePostLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBased"] });
      queryClient.invalidateQueries({ queryKey: ["itemBased"] });
      queryClient.invalidateQueries({ queryKey: ["concert-data"] });
      queryClient.invalidateQueries({
        queryKey: ["search-concert-data"],
      });
      queryClient.invalidateQueries({
        queryKey: ["search-liked-concert-data"],
      });
      queryClient.invalidateQueries({ queryKey: ["showDetail"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default usePostLike;
