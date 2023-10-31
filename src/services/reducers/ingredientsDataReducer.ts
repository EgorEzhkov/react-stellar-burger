import { TIngredient } from "../../types/types";
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  TIngredientsDataActions,
} from "../actions/ingredientsData";

type TInitialState = {
  ingredients: ReadonlyArray<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsSuccess: boolean;
};

const initialState: TInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsSuccess: false,
};

export const ingredientsDataReducer = (store = initialState, action: TIngredientsDataActions): TInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...store, ingredientsRequest: true };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...store,
        ingredientsSuccess: true,
        ingredientsFailed: false,
        ingredientsRequest: false,
        ingredients: action.ingredients,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...store,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    default: {
      return store;
    }
  }
};
