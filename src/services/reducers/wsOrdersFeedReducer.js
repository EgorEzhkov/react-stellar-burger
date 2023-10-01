import {
  WS_ORDERS_FEED_CONNECTION_START,
  WS_ORDERS_FEED_CONNECTION_SUCCESS,
  WS_ORDERS_FEED_CONNECTION_ERROR,
  WS_ORDERS_FEED_CONNECTION_CLOSED,
  WS_ORDERS_FEED_GET_MESSAGE,
  WS_ORDERS_FEED_CONNECTION_STOP,
} from "../actions/wsOrdersFeedData.js";

const initialState = {
  wsConnected: false,
  messages: [],
  error: undefined,
};

export const wsOrdersFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_ORDERS_FEED_CONNECTION_START:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_ORDERS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_ORDERS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_ORDERS_FEED_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: [action.payload],
      };
    default:
      return state;
  }
};
