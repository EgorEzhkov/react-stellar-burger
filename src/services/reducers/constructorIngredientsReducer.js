import {
  DELETE_INGREDIENT,
  POST_INGREDIENT,
  NEW_ARRAY_INGREDIENT,
  MOVE_INGREDIENT,
} from "../actions/constructorIngredientsData";
import update from "immutability-helper";

const initialState = {
  ingredients: [],
  bun: [],
};

export const consctructorIngredientsReduser = (
  state = initialState,
  action
) => {
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
        ingredients: [
          ...state.ingredients.filter(
            (item, index) => index !== action.payload
          ),
        ],
      };
    }
    case NEW_ARRAY_INGREDIENT: {
      return { ...state, ingredients: [action.payload] };
    }
    case MOVE_INGREDIENT: {
      // const ingredients = [...state.ingredients];
      // ingredients.splice(action.payload.dragIndex, 0, ingredients.splice(action.payload.hoverIndex, 1)[0])
      return {
        ...state,
        ingredients: update(state.ingredients, {
          $splice: [
            [action.payload.dragIndex, 1],
            [
              action.payload.hoverIndex,
              0,
              state.ingredients[action.payload.dragIndex],
            ],
          ],
        }),
      };
    }
    default:
      return state;
  }
};
