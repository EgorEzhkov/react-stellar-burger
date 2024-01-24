import { object } from "prop-types";
import { TOrder, TWsMessageData } from "../../types/types";
import {
  WS_PROFILE_ORDERS_CONNECTION_START,
  WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  WS_PROFILE_ORDERS_CONNECTION_ERROR,
  WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  WS_PROFILE_ORDERS_GET_MESSAGE,
  WS_PROFILE_ORDERS_CONNECTION_STOP,
  TWsProfileOrdersDataActions,
} from "../actions/wsProfileOrdersData";

type TInitialState = {
  wsConnected: boolean;
  messages: TWsMessageData[];
  orders: ReadonlyArray<TOrder>;
  error: undefined | unknown;
  wsConnectionRequest: boolean;
  wsClosing: boolean;
};

const initialState: TInitialState = {
  wsConnected: false,
  messages: [],
  orders: [],
  error: undefined,
  wsConnectionRequest: false,
  wsClosing: false,
};

export const wsProfileOrdersReducer = (state = initialState, action: TWsProfileOrdersDataActions): TInitialState => {
  switch (action.type) {
    case WS_PROFILE_ORDERS_CONNECTION_START:
      return {
        ...state,
        error: undefined,
        wsConnectionRequest: true,
      };
    case WS_PROFILE_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
        wsConnectionRequest: false,
      };

    case WS_PROFILE_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_PROFILE_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        wsClosing: false,
      };

    case WS_PROFILE_ORDERS_CONNECTION_STOP:
      return {
        ...state,
        wsClosing: true,
      };

    case WS_PROFILE_ORDERS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: [action.payload],
        orders: action.payload.orders,
      };

    default:
      return state;
  }
};
