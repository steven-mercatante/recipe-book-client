import Link from "next/link";
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
      <div className="mb-8">
        <h1>{recipe.name}</h1>
        <p className="text-sm">
          {/*TODO: swap this with "Save this recipe" if user is browsing someone else's recipe.
          If user is not logged in, add a `?` icon with tooltip that says they'll need to register
           a free account first*/}
          <Link href={`/recipes/${recipe.id}/edit`}>Edit this recipe</Link>
        </p>
      </div>
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

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // TODO: handle error state
    // TODO: if I'm gonna pass Cookie header, I don't think I need to wrap this in withPageAuthRequired
    // but it'd be nice to _not_ have to pass Cookie header...
    // See: https://stackoverflow.com/questions/68056181/nextjs-auth0-get-data-in-getserversideprops
    const { id } = context.params as Params;
    const res = await recipesApi.retrieveRecipe(id, {
      headers: { Cookie: context.req.headers.cookie! },
    });
    const recipe = res.data;
    return { props: { recipe } };
  },
});
