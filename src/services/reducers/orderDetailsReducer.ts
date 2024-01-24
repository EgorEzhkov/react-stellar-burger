import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, TOrderDetailsDataActions } from "../actions/orderDetailsData";

type TInitialState = {
  orderNumber: number | null;
  orderRequest: boolean;
  orderSuccess: boolean;
  orderFailed: boolean;
};

const initialState: TInitialState = {
  orderNumber: null,
  orderRequest: false,
  orderSuccess: false,
  orderFailed: false,
};

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsDataActions): TInitialState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.numberData,
        orderRequest: false,
        orderFailed: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    default:
      return state;
  }
};
