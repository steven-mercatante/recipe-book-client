import { recipesApi } from "../api";
import { Form, Formik } from "formik";
import TextField from "./TextField";
import { Recipe } from "recipe-book-sdk";
import TextareaField from "./TextareaField";

interface Props {
  recipe?: Recipe;
}

interface SubmitValues {
  name: string;
  ingredients: string;
  instructions: string;
}

export default function RecipeForm({ recipe }: Props) {
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
    <Formik
      initialValues={{
        name: recipe?.name ?? "",
        ingredients: recipe?.ingredients ?? "",
        instructions: recipe?.instructions ?? "",
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <TextField type="text" name="name" label="Name" />
        <TextareaField name="ingredients" label="Ingredients" />
        <TextareaField name="instructions" label="Instructions" />
        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
}
