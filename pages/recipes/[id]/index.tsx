import { recipesApi } from "api";
import { Recipe } from "recipe-book-sdk";
import { ParsedUrlQuery } from "querystring";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { splitByNewline } from "utils/text";
import ItemList from "components/ItemList";

interface Props {
  recipe: Recipe;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function ViewRecipe({ recipe }: Props) {
  return (
    <div>
      <h1>{recipe.name}</h1>
      {recipe.ingredients && (
        <div>
          <h3>Instructions</h3>
          <ItemList items={splitByNewline(recipe.ingredients)} />
        </div>
      )}
      {recipe.instructions && (
        <div>
          <h3>Ingredients</h3>
          <ItemList items={splitByNewline(recipe.instructions)} />
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // TODO: handle error state
    // TODO: if I'm gonna pass Cookie header, I don't think I need to wrap this in withPageAuthRequired
    // but it'd be nice to _not_ have to pass Cookie header...
    // See: https://stackoverflow.com/questions/68056181/nextjs-auth0-get-data-in-getserversideprops
    const { id } = context.params as Params;
    const res = await recipesApi.retrieveRecipe(id, {
      headers: { Cookie: context.req.headers.cookie },
    });
    const recipe = res.data;
    return { props: { recipe } };
  },
});
