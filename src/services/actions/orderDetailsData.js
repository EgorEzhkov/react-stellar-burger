import { apiOrder } from "../../utils/api";

export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";

export const getApiOrder = (ingredientsData) => {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    apiOrder(ingredientsData)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            numberData: data.order.number,
            type: GET_ORDER_SUCCESS,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
