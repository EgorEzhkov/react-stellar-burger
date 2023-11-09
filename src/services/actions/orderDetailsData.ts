import { AppDispatch, AppThunk, TIngredient } from "../../types/types";
import { apiOrder } from "../../utils/api";
import { DELETE_ALL_INRGEDIENTS } from "./constructorIngredientsData";

export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";

interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}
interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly numberData: number;
}

export type TOrderDetailsDataActions = IGetOrderFailed | IGetOrderRequest | IGetOrderSuccess;

export const getApiOrder: AppThunk = (ingredientsData: ReadonlyArray<TIngredient>) => {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    apiOrder(ingredientsData)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            numberData: data.order.number,
            type: GET_ORDER_SUCCESS,
          });
          dispatch({
            type: DELETE_ALL_INRGEDIENTS,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};
