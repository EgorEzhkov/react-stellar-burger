import {
  DELETE_INFO_INGREDIENT,
  GET_INFO_INGREDIENT,
} from "../actions/infoIngredientData";

const initialState = {
  infoIngredient: [],
};

export const infoIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO_INGREDIENT: {
      return { ...state, infoIngredient: action.payload };
    }
    case DELETE_INFO_INGREDIENT: {
      return { ...state, infoIngredient: [] };
    }
    default:
      return state;
  }
};
