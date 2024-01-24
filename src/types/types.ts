import { store } from "../services/store";
import { ActionCreator, Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { TConstructorIngredientsActions } from "../services/actions/constructorIngredientsData";
import { TIngredientsDataActions } from "../services/actions/ingredientsData";
import { TOrderDetailsDataActions } from "../services/actions/orderDetailsData";
import { TUserDataActions } from "../services/actions/userData";
import { TWsOrdersFeedDataActions } from "../services/actions/wsOrdersFeedData";
import { TWsProfileOrdersDataActions } from "../services/actions/wsProfileOrdersData";

export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly _id: string;
  readonly uniqueId?: string;
};

export type TOrder = {
  readonly createdAt: string;
  ingredients: ReadonlyArray<string>;
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
};

export type TWsMessageData = {
  orders: ReadonlyArray<TOrder>;
  readonly success: boolean;
  readonly total: number;
  readonly totalToday: number;
};


export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions =
  | TConstructorIngredientsActions
  | TIngredientsDataActions
  | TOrderDetailsDataActions
  | TUserDataActions
  | TWsOrdersFeedDataActions
  | TWsProfileOrdersDataActions;

// Типизация thunk в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

export type AppDispatch = Dispatch<TApplicationActions>;
