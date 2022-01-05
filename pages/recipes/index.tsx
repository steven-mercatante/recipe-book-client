import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Recipe } from "recipe-book-sdk";
import { recipesApi } from "api";

interface Props {
  recipes: Recipe[];
}

function RecipesList({ recipes }: Props) {
  const { data: session } = useSession();
  return (
    <div className="recipes-list">
      <ul>
        {recipes.map((recipe: Recipe) => (
          <li key={recipe.id}>
            <Link href={`/recipes/${recipe.id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// See: https://github.com/auth0/nextjs-auth0/issues/524
export const getServerSideProps = async (context) => {
  // TODO: handle error state
  // TODO: if I'm gonna pass Cookie header, I don't think I need to wrap this in withPageAuthRequired
  // but it'd be nice to _not_ have to pass Cookie header...
  // See: https://stackoverflow.com/questions/68056181/nextjs-auth0-get-data-in-getserversideprops

  // TODO: can the cookie header be attached via middleware?
  const res = await recipesApi.listRecipes({
    headers: { Cookie: context.req.headers.cookie! },
  });
  const recipes = res.data;

  return { props: { recipes } };
};

export default RecipesList;
