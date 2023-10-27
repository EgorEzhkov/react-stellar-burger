import { combineReducers } from "redux";
import { ingredientsDataReducer } from "./ingredientsDataReducer";
import { consctructorIngredientsReduser } from "./constructorIngredientsReducer";
import { orderDetailsReducer } from "./orderDetailsReducer";
import { userReducer } from "./userReducer";
import { wsOrdersFeedReducer } from "./wsOrdersFeedReducer";
import { wsProfileOrdersReducer } from "./wsProfileOrdersReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsDataReducer,
  dataConstructor: consctructorIngredientsReduser,
  orderData: orderDetailsReducer,
  userData: userReducer,
  wsOrdersFeed: wsOrdersFeedReducer,
  wsProfileOrders: wsProfileOrdersReducer,
});
