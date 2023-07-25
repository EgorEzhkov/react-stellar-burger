export const POST_INGREDIENT = "POST_INGREDIENT";

export const postIngredient = (data) => ({
  type: POST_INGREDIENT,
  payload: data,
});
