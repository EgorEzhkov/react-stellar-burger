import { TIngredient } from "../../types/types";
import { apiIngredients } from "../../utils/api";

export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";

interface IGetIngredientFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

interface IGetIngredientRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: ReadonlyArray<TIngredient>;
}

export type TIngredientsDataActions = IGetIngredientFailed | IGetIngredientRequest | IGetIngredientSuccess;

export const getIngredients = () => {
  // ИСПРАВИТЬ ТИПИЗАЦИЮ
  return function (dispatch: any) {
    // ИСПРАВИТЬ ТИПИЗАЦИЮ
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    apiIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
        console.log(err);
      });
  };
};
