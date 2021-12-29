import { Configuration, RecipesApi } from "recipe-book-sdk";

// TODO: fetch from env
const basePath = "http://localhost:3000/api";

export const recipesApi = new RecipesApi({
  basePath,
} as Configuration);
