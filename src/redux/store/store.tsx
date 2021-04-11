import { applyMiddleware, compose, createStore } from "redux";

import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducers";

// válido para TS
// https://stackoverflow.com/questions/52800877/error-with-redux-devtools-extension-using-ts-property-redux-devtools-extens
// const composeEnhancers =
//   ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) ||
//   compose;

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//no olvidar el composeEnhancers(applyMiddleware(thunk)) si no, tira el error
// "error expected the reducer to be a function"
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
