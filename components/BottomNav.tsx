import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import HomeIcon from "./icons/HomeIcon";
// import BookmarkIcon from "./icons/BookmarkIcon";
// import SearchIcon from "./icons/SearchIcon";
import { Routes } from "../constants";
import CreateIcon from "./icons/CreateIcon";

export default function BottomNav() {
  const router = useRouter();
  const { user } = useUser();

  if (!user) return null;

  function handleSubmit() {
    /**
     * requestSubmit actually dispatches a submit event and triggers validation
     * https://www.stefanjudis.com/today-i-learned/requestsubmit-offers-a-way-to-validate-a-form-before-submitting-it/
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit
     */
    document.querySelector<HTMLFormElement>("#recipe-form")!.requestSubmit();
    if (router.pathname === Routes.NewRecipe) {
      router.push(Routes.ViewRecipes);
    } else if (router.pathname === Routes.EditRecipe) {
      const recipeId = router.query.id as string;
      router.push(Routes.ViewRecipe.replace("[id]", recipeId));
    }
  }

  if (
    router.pathname === Routes.EditRecipe ||
    router.pathname === Routes.NewRecipe
  ) {
    return (
      <div className="bottom-nav flex justify-center bg-red-200 fixed bottom-0 inset-x-0 p-3">
        <button
          className="px-4 py-1 border-2 border-red-600 rounded-md"
          onClick={handleSubmit}
          type="submit"
        >
          Save
        </button>
      </div>
    );
  }

  return (
    <div className="bottom-nav bg-red-200 fixed bottom-0 inset-x-0 p-3">
      <ul className="flex place-content-evenly">
        <li>
          <Link href={Routes.ViewRecipes}>
            <a>
              <HomeIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href={Routes.NewRecipe}>
            <a>
              <CreateIcon />
            </a>
          </Link>
        </li>
        {/*<li>*/}
        {/*  <a>*/}
        {/*    <BookmarkIcon />{" "}*/}
        {/*  </a>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <a>*/}
        {/*    <SearchIcon />{" "}*/}
        {/*  </a>*/}
        {/*</li>*/}
      </ul>
    </div>
  );
}
