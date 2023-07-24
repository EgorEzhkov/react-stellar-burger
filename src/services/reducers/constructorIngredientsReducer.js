import { POST_INGREDIENT } from "../actions/constructorIngredientsData";

const initialState = {
  ingredients: [],
	dsaf: false,
	dsfasd: false
};

export const consctructorIngredientsReduser = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case POST_INGREDIENT: {
			console.dir(state.keys());
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    }
    default:
      return state;
  }
};
