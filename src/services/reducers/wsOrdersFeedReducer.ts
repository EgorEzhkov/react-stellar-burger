import { TOrder, TWsMessageData } from "../../types/types";
import {
  WS_ORDERS_FEED_CONNECTION_START,
  WS_ORDERS_FEED_CONNECTION_SUCCESS,
  WS_ORDERS_FEED_CONNECTION_ERROR,
  WS_ORDERS_FEED_CONNECTION_CLOSED,
  WS_ORDERS_FEED_GET_MESSAGE,
  WS_ORDERS_FEED_CONNECTION_STOP,
  TWsOrdersFeedDataActions,
} from "../actions/wsOrdersFeedData";

type TInitialState = {
  readonly wsConnected: boolean;
  messages: ReadonlyArray<TWsMessageData>;
  orders: ReadonlyArray<TOrder>;
  readonly total: number;
  readonly totalToday: number;
  readonly error: undefined | unknown;
  readonly wsConnectionRequest: boolean;
  readonly wsClosing: boolean;
};

const initialState: TInitialState = {
  wsConnected: false,
  messages: [],
  orders: [],
  total: 0,
  totalToday: 0,
  error: undefined,
  wsConnectionRequest: false,
  wsClosing: false,
};

export const wsOrdersFeedReducer = (state = initialState, action: TWsOrdersFeedDataActions): TInitialState => {
  switch (action.type) {
    case WS_ORDERS_FEED_CONNECTION_START:
      return {
        ...state,
        error: undefined,
        wsConnectionRequest: true,
      };
    case WS_ORDERS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
        wsConnectionRequest: false,
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
        wsClosing: false,
      };
    case WS_ORDERS_FEED_CONNECTION_STOP:
      return {
        ...state,
        wsClosing: true,
      };
    case WS_ORDERS_FEED_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: [action.payload],
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
