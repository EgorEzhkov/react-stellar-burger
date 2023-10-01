const socketMiddleware = (wsActions) => (store) => {
  let socket = null;
  return (next) => (action) => {
    const { dispatch } = store;
    const { type, payload } = action;

    if (type === wsActions.connectStart) {
      socket = new WebSocket(payload);
    }

    if (socket) {
      socket.onopen = (e) => dispatch(wsActions.onOpen(e));
      socket.onclose = (e) => dispatch(wsActions.onClose(e));
      socket.onerror = (e) => dispatch(wsActions.onError(e));
      socket.onmessage = (e) => dispatch(wsActions.onMessage(JSON.parse(e.data)));

      if (type === wsActions.connectStop && socket.readyState === 1) {
        socket.close(1000, "close normal");
        socket = null;
      }
    }
    next(action);
  };
};

export default socketMiddleware;
