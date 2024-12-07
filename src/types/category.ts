export type TagCategory = {
  tagCategoryId: number;
  tagName: string;
  iconUrl: string;
};

export type TagCategoriesResult = {
  categories: TagCategory[];
};

export type TagCategoriesResponse = {
  code: string;
  message: string;
  result: TagCategoriesResult;
};

export type PlaceCategory = {
  placeCategoryId: number;
  categoryName: string;
};

export type PlaceCategoriesResult = {
  categories: PlaceCategory[];
};

export type PlaceCategoriesResponse = {
  code: string;
  message: string;
  result: PlaceCategoriesResult;
};