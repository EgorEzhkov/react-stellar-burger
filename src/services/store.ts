import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { wsOrdersFeedActions } from "./actions/wsOrdersFeedData";
import { wsProfileOrdersActions } from "./actions/wsProfileOrdersData";
import socketMiddleware from "./middleware/socketMiddleware";
import { rootReducer } from "./reducers/rootReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      socketMiddleware(wsOrdersFeedActions),
      socketMiddleware(wsProfileOrdersActions)
    )
  )
);
