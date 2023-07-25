import { POST_INGREDIENT } from "../actions/constructorIngredientsData";

const initialState = {
  ingredients: [],
};

export const consctructorIngredientsReduser = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case POST_INGREDIENT: {
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    }
    default:
      return state;
  }
};
