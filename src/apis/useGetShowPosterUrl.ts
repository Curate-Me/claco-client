import client from "./client";

export type ShowPosterUrlResponse = {
  code: string;
  message: string;
  result: string;
  refreshed: boolean;
};

const useGetShowPoster = async (
  KopisURL: string,
): Promise<ShowPosterUrlResponse> => {
  try {
    const response = await client.get<ShowPosterUrlResponse>(
      `/concerts/posters?KopisURL=${encodeURIComponent(KopisURL)}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default useGetShowPoster;
