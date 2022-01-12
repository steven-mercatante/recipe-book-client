import Link from "next/link";
import { recipesApi } from "api";
import { Recipe } from "recipe-book-api-client";
import { ParsedUrlQuery } from "querystring";
import { splitByNewline } from "utils/text";
import ItemList from "components/ItemList";
import { getRecipeTags } from "../../../utils/recipe";

interface Props {
  recipe: Recipe;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function ViewRecipe({ recipe }: Props) {
  const recipeTags = getRecipeTags(recipe);

  return (
    <div>
      <div className="mb-8">
        <h1>{recipe.name}</h1>
        <p className="text-sm">
          {/*TODO: swap this with "Save this recipe" if user is browsing someone else's recipe.
          If user is not logged in, add a `?` icon with tooltip that says they'll need to register
           a free account first*/}
          <Link href={`/recipes/${recipe.id}/edit`}>Edit this recipe</Link>
        </p>
      </div>
      {recipeTags?.length > 0 && (
        <div>
          <span>Tagged with</span>
          <ul className="flex">
            {recipeTags.map((tag) => (
              <li className="text-sm mr-2" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
      {recipe.ingredients && (
        <div className="mt-4">
          <h2 className="text-2xl mb-2">Ingredients</h2>
          <ItemList items={splitByNewline(recipe.ingredients)} />
        </div>
      )}
      {recipe.instructions && (
        <div className="mt-8">
          <h2 className="text-2xl mb-2">Instructions</h2>
          <ItemList
            items={splitByNewline(recipe.instructions)}
            showStepNum={true}
          />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  // TODO: handle error state
  const { id } = context.params as Params;
  const res = await recipesApi.retrieveRecipe(id);
  const recipe = res.data;
  return { props: { recipe } };
}
