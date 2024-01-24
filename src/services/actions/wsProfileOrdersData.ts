import { wsActionsCreater } from "../../utils/util";
import { TWsMessageData } from "../../types/types";

export const WS_PROFILE_ORDERS_CONNECTION_START: "WS_PROFILE_ORDERS_CONNECTION_START" = "WS_PROFILE_ORDERS_CONNECTION_START";
export const WS_PROFILE_ORDERS_CONNECTION_SUCCESS: "WS_PROFILE_ORDERS_CONNECTION_SUCCESS" = "WS_PROFILE_ORDERS_CONNECTION_SUCCESS";
export const WS_PROFILE_ORDERS_CONNECTION_ERROR: "WS_PROFILE_ORDERS_CONNECTION_ERROR" = "WS_PROFILE_ORDERS_CONNECTION_ERROR";
export const WS_PROFILE_ORDERS_CONNECTION_CLOSED: "WS_PROFILE_ORDERS_CONNECTION_CLOSED" = "WS_PROFILE_ORDERS_CONNECTION_CLOSED";
export const WS_PROFILE_ORDERS_GET_MESSAGE: "WS_PROFILE_ORDERS_GET_MESSAGE" = "WS_PROFILE_ORDERS_GET_MESSAGE";
export const WS_PROFILE_ORDERS_CONNECTION_STOP: "WS_PROFILE_ORDERS_CONNECTION_STOP" = "WS_PROFILE_ORDERS_CONNECTION_STOP";

interface IWsProfileOrdersConnectionStart {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_START;
  payload: string;
}

interface IWsProfileOrdersConnectionSuccess {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_SUCCESS;
  readonly payload: Event;
}

interface IWsProfileOrdersConnectionError {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_ERROR;
  readonly payload: Event;
}

interface IWsProfileOrdersConnectionClosed {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_CLOSED;
  readonly payload: Event;
}

interface IWsProfileOrdersConnectionStop {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_STOP;
}

interface IWsProfileOrdersGetMessage {
  readonly type: typeof WS_PROFILE_ORDERS_GET_MESSAGE;
  readonly payload: TWsMessageData;
}

export type TWsProfileOrdersDataActions =
  | IWsProfileOrdersConnectionStart
  | IWsProfileOrdersConnectionSuccess
  | IWsProfileOrdersConnectionError
  | IWsProfileOrdersConnectionClosed
  | IWsProfileOrdersConnectionStop
  | IWsProfileOrdersGetMessage;

export const wsProfileOrdersConnectionStart = (url: string): IWsProfileOrdersConnectionStart => ({
  type: WS_PROFILE_ORDERS_CONNECTION_START,
  payload: url,
});

export const wsProfileOrdersConnectionSuccess = (event: Event): IWsProfileOrdersConnectionSuccess => ({
  type: WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  payload: event,
});

export const wsProfileOrdersConnectionError = (event: Event): IWsProfileOrdersConnectionError => ({
  type: WS_PROFILE_ORDERS_CONNECTION_ERROR,
  payload: event,
});

export const wsProfileOrdersConnectionClosed = (event: Event): IWsProfileOrdersConnectionClosed => ({
  type: WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  payload: event,
});

export const wsProfileOrdersConnectionMessage = (data: TWsMessageData): IWsProfileOrdersGetMessage => ({
  type: WS_PROFILE_ORDERS_GET_MESSAGE,
  payload: data,
});

export const wsProfileOrdersConnectionStop = (): IWsProfileOrdersConnectionStop => ({
  type: WS_PROFILE_ORDERS_CONNECTION_STOP,
});

export const wsProfileOrdersActions = wsActionsCreater(
  wsProfileOrdersConnectionStart,
  wsProfileOrdersConnectionSuccess,
  wsProfileOrdersConnectionMessage,
  wsProfileOrdersConnectionClosed,
  wsProfileOrdersConnectionError,
  wsProfileOrdersConnectionStop
);
