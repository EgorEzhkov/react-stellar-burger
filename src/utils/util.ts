import { useState } from "react";

export const wsActionsCreater = (
  connectStart: Function,
  onOpen: Function,
  onMessage: Function,
  onClose: Function,
  onError: Function,
  connectStop: Function
) => ({
  connectStart: connectStart,
  onOpen: onOpen,
  onMessage: onMessage,
  onClose: onClose,
  onError: onError,
  connectStop: connectStop,
});
