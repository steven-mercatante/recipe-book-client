import { recipesApi } from "../api";
import { Form, Formik } from "formik";
import TextField from "./TextField";
import { Recipe } from "recipe-book-api-client";
import TextareaField from "./TextareaField";
import { useRouter } from "next/router";
import { Routes } from "../constants";

interface Props {
  recipe?: Recipe;
}

interface SubmitValues {
  name: string;
  ingredients: string;
  instructions: string;
}

export default function RecipeForm({ recipe }: Props) {
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
        <button className="bg-red-700 rounded-md px-6 py-2 text-white">
          Delete Recipe
        </button>
      )}
    </div>
  );
}
