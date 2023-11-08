import { Middleware } from "redux";
import { RootState } from "../../types/types";

type TWsActions = {
  onOpen: Function;
  onClose: Function;
  onError: Function;
  onMessage: Function;
  connectStart: Function;
  connectStop: Function;
};

const socketMiddleware =
  (wsActions: TWsActions): Middleware =>
  (store) => {
    let socket: WebSocket | null = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsActions.connectStart().type) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = (e: Event) => dispatch(wsActions.onOpen(e));
        socket.onclose = (e: Event) => dispatch(wsActions.onClose(e));
        socket.onerror = (e: Event) => dispatch(wsActions.onError(e));
        socket.onmessage = (e: MessageEvent) => dispatch(wsActions.onMessage(JSON.parse(e.data)));

        if (type === wsActions.connectStop().type && socket.readyState === 1) {
          socket.close(1000, "close normal");
          socket = null;
        }
      }
      next(action);
    };
  };

export default socketMiddleware;
