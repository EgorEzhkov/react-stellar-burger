import { TOrder } from "../../types/types";
import { wsActionsCreater } from "../../utils/util";

export const WS_ORDERS_FEED_CONNECTION_START: "WS_ORDERS_FEED_CONNECTION_START" = "WS_ORDERS_FEED_CONNECTION_START";
export const WS_ORDERS_FEED_CONNECTION_SUCCESS: "WS_ORDERS_FEED_CONNECTION_SUCCESS" = "WS_ORDERS_FEED_CONNECTION_SUCCESS";
export const WS_ORDERS_FEED_CONNECTION_ERROR: "WS_ORDERS_FEED_CONNECTION_ERROR" = "WS_ORDERS_FEED_CONNECTION_ERROR";
export const WS_ORDERS_FEED_CONNECTION_CLOSED: "WS_ORDERS_FEED_CONNECTION_CLOSED" = "WS_ORDERS_FEED_CONNECTION_CLOSED";
export const WS_ORDERS_FEED_GET_MESSAGE: "WS_ORDERS_FEED_GET_MESSAGE" = "WS_ORDERS_FEED_GET_MESSAGE";
export const WS_ORDERS_FEED_CONNECTION_STOP: "WS_ORDERS_FEED_CONNECTION_STOP" = "WS_ORDERS_FEED_CONNECTION_STOP";

export type TWsMessageData = {
  orders: ReadonlyArray<TOrder>;
  readonly success: boolean;
  readonly total: number;
  readonly totalToday: number;
};

interface IWsOrdersFeedConnectionStart {
  readonly type: typeof WS_ORDERS_FEED_CONNECTION_START;
  readonly payload: string;
}

interface IWsOrdersFeedConnectionSuccess {
  readonly type: typeof WS_ORDERS_FEED_CONNECTION_SUCCESS;
  readonly payload: Event;
}

interface IWsOrdersFeedConnectionError {
  readonly type: typeof WS_ORDERS_FEED_CONNECTION_ERROR;
  readonly payload: Event;
}

interface IWsOrdersFeedConnectionClosed {
  readonly type: typeof WS_ORDERS_FEED_CONNECTION_CLOSED;
  readonly payload: Event;
}

interface IWsOrdersFeedConnectionStop {
  readonly type: typeof WS_ORDERS_FEED_CONNECTION_STOP;
}

interface IWsOrdersFeedGetMessage {
  type: typeof WS_ORDERS_FEED_GET_MESSAGE;
  payload: TWsMessageData;
}

export type TWsOrdersFeedDataActions =
  | IWsOrdersFeedConnectionStart
  | IWsOrdersFeedConnectionSuccess
  | IWsOrdersFeedConnectionError
  | IWsOrdersFeedConnectionClosed
  | IWsOrdersFeedConnectionStop
  | IWsOrdersFeedGetMessage;

export const wsOrdersFeedConnectionStart = (url: string): IWsOrdersFeedConnectionStart => ({
  type: WS_ORDERS_FEED_CONNECTION_START,
  payload: url,
});

export const wsOrdersFeedConnectionSuccess = (event: Event): IWsOrdersFeedConnectionSuccess => ({
  type: WS_ORDERS_FEED_CONNECTION_SUCCESS,
  payload: event,
});

export const wsOrdersFeedConnectionError = (event: Event): IWsOrdersFeedConnectionError => ({
  type: WS_ORDERS_FEED_CONNECTION_ERROR,
  payload: event,
});

export const wsOrdersFeedConnectionClosed = (event: Event): IWsOrdersFeedConnectionClosed => ({
  type: WS_ORDERS_FEED_CONNECTION_CLOSED,
  payload: event,
});

export const wsOrdersFeedConnectionMessage = (data: TWsMessageData): IWsOrdersFeedGetMessage => ({
  type: WS_ORDERS_FEED_GET_MESSAGE,
  payload: data,
});

export const wsOrdersFeedConnectionStop = (): IWsOrdersFeedConnectionStop => ({
  type: WS_ORDERS_FEED_CONNECTION_STOP,
});

export const wsOrdersFeedActions = wsActionsCreater(
  wsOrdersFeedConnectionStart,
  wsOrdersFeedConnectionSuccess,
  wsOrdersFeedConnectionMessage,
  wsOrdersFeedConnectionClosed,
  wsOrdersFeedConnectionError,
  wsOrdersFeedConnectionStop
);
