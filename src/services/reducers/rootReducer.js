import { combineReducers } from "redux";
import { ingredientsDataReducer } from "./ingredientsDataReducer";
import { consctructorIngredientsReduser } from "./constructorIngredientsReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsDataReducer,
  constructor: consctructorIngredientsReduser,
});
