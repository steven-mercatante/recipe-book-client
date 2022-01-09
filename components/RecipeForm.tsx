import { useState } from "react";
import { recipesApi } from "../api";
import { Form, Formik } from "formik";
import TextField from "./TextField";
import { Recipe } from "recipe-book-api-client";
import TextareaField from "./TextareaField";
import { useRouter } from "next/router";
import { Routes } from "../constants";
import DeleteRecipeDialog from "./DeleteRecipeDialog";

interface Props {
  recipe?: Recipe;
}

interface SubmitValues {
  name: string;
  ingredients: string;
  instructions: string;
}

export default function RecipeForm({ recipe }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();

  const showDeleteBtn = router.pathname === Routes.EditRecipe;

  function handleSubmit(values: SubmitValues) {
    if (recipe?.id) {
      recipesApi.updateRecipe(recipe?.id!, {
        name: values.name,
        ingredients: values.ingredients,
        instructions: values.instructions,
      });
    } else {
      recipesApi.createRecipe({
        name: values.name,
        ingredients: values.ingredients,
        instructions: values.instructions,
      });
    }
  }

  function handleDeleteCancel() {
    setShowDeleteDialog(false);
  }

  async function handleDeleteConfirm() {
    setShowDeleteDialog(false);
    await recipesApi.destroyRecipe(recipe?.id!);
    router.push(Routes.ViewRecipes);
  }

  return (
    <div className="recipe-form">
      <Formik
        initialValues={{
          name: recipe?.name ?? "",
          ingredients: recipe?.ingredients ?? "",
          instructions: recipe?.instructions ?? "",
        }}
        onSubmit={handleSubmit}
      >
        <Form id="recipe-form">
          <TextField name="name" label="Name" />
          <TextareaField name="ingredients" label="Ingredients" />
          <TextareaField name="instructions" label="Instructions" />
        </Form>
      </Formik>
      {showDeleteBtn && (
        <button
          className="bg-red-700 rounded-md px-6 py-2 text-white"
          onClick={() => setShowDeleteDialog(true)}
        >
          Delete Recipe
        </button>
      )}
      {showDeleteDialog && (
        <DeleteRecipeDialog
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
