import { TIngredient } from "../../types/types";
import {
  DELETE_INGREDIENT,
  POST_INGREDIENT,
  NEW_ARRAY_INGREDIENT,
  MOVE_INGREDIENT,
  DELETE_ALL_INRGEDIENTS,
  TConstructorIngredientsActions,
} from "../actions/constructorIngredientsData";
import update from "immutability-helper";

type TInitialState = {
  ingredients: ReadonlyArray<TIngredient>;
  bun: ReadonlyArray<TIngredient>;
};

const initialState: TInitialState = {
  ingredients: [],
  bun: [],
};

export const consctructorIngredientsReduser = (state = initialState, action: TConstructorIngredientsActions): TInitialState => {
  switch (action.type) {
    case POST_INGREDIENT: {
      if (action.payload.type === "bun") {
        return { ...state, bun: [action.payload, action.payload] };
      }
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients.filter((item, index) => index !== action.payload)],
      };
    }
    case DELETE_ALL_INRGEDIENTS: {
      return {
        ...state,
        ingredients: [],
        bun: [],
      };
    }
    // case NEW_ARRAY_INGREDIENT: {
    //   return { ...state, ingredients: [action.payload] };
    // }
    case MOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: update(state.ingredients, {
          $splice: [
            [action.payload.dragIndex, 1],
            [action.payload.hoverIndex, 0, state.ingredients[action.payload.dragIndex]],
          ],
        }),
      };
    }
    default:
      return state;
  }
};
