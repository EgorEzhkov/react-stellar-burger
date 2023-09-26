import { combineReducers } from "redux";
import { ingredientsDataReducer } from "./ingredientsDataReducer";
import { consctructorIngredientsReduser } from "./constructorIngredientsReducer";
import { infoIngredientReducer } from "./infoIngredientReducer";
import { orderDetailsReducer } from "./orderDetailsReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsDataReducer,
  dataConstructor: consctructorIngredientsReduser,
  infoIngredient: infoIngredientReducer,
  orderData: orderDetailsReducer,
  userData: userReducer,
});
