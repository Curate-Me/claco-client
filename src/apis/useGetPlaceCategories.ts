import { client } from "@/apis";
import { PlaceCategoriesResponse } from "@/types";

const getPlaceCategories = async (): Promise<PlaceCategoriesResponse> => {
  const response =
    await client.get<PlaceCategoriesResponse>("/place-categories");
  return response.data;
};

export default getPlaceCategories;
