export const POST_INGREDIENT: "POST_INGREDIENT" = "POST_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const NEW_ARRAY_INGREDIENT: "NEW_ARRAY_INGREDIENT" = "NEW_ARRAY_INGREDIENT";
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";
export const DELETE_ALL_INRGEDIENTS: "DELETE_ALL_INRGEDIENTS" = "DELETE_ALL_INRGEDIENTS";

interface IPostIngredientAction {
  readonly type: typeof POST_INGREDIENT;
  readonly payload: any;
}

interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: any;
}

interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT;
  readonly payload: any;
}

interface INewArrayIngredient {
  readonly type: typeof NEW_ARRAY_INGREDIENT;
}

interface IDeleteAllIngredient {
  readonly type: typeof DELETE_ALL_INRGEDIENTS;
}

export type TConstructorIngredientsActions =
  | IPostIngredientAction
  | IDeleteAllIngredient
  | IDeleteIngredient
  | IMoveIngredient
  | INewArrayIngredient;

export const postIngredient = (data: object): IPostIngredientAction => ({
  type: POST_INGREDIENT,
  payload: data,
});

export const deleteIngredient = (data: object): IDeleteIngredient => ({
  type: DELETE_INGREDIENT,
  payload: data,
});

export const moveIngredient = (data: object): IMoveIngredient => ({
  type: MOVE_INGREDIENT,
  payload: data,
});
