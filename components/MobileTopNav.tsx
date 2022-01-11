import { MenuIcon } from "@heroicons/react/outline";
import React from "react";
import { Routes } from "../constants";
import { useRouter } from "next/router";

interface Props {
  setSidebarOpen: (b: boolean) => void;
}

export default function MobileTopNav({ setSidebarOpen }: Props) {
  const router = useRouter();

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

  const showSaveBtn =
    router.pathname === Routes.NewRecipe ||
    router.pathname === Routes.EditRecipe;

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
        <div>
          <strong>Merc Meals</strong>
        </div>
        <div>
          {showSaveBtn && (
            <button
              className="relative bottom-1 mr-4 px-4 py-1 bg-green-300 text-green-900 rounded-md"
              onClick={handleSubmit}
              type="submit"
            >
              <strong>Save</strong>
            </button>
          )}
          <button
            type="button"
            className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
