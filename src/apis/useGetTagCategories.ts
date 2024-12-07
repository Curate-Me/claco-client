import { client } from "@/apis";
import { TagCategoriesResponse } from "@/types";

const getTagCategories = async (): Promise<TagCategoriesResponse> => {
  const response = await client.get<TagCategoriesResponse>("/tag-categories");
  return response.data;
};

export default getTagCategories;
