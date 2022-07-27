import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
// import rootReducer from "../reducers/rootreducer";
import rootReducer from "./reducers/rootreducer";

// initial states here
// import React from "react";

// const store = () => {
//   const initialState = {};

//   // middleware
//   const middleware = [thunk, logger];

//   // creating store
//   const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

//   // assigning store to next wrepper
//   const makeStore = () => store;

//   const wrapper = createWrapper(makeStore);

//   return { store, wrapper };
// };

// export default store;
const initialState = {};

// middleware
const middleware = [thunk];

// creating store
export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

// assigning store to next wrepper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

// const dataRedux = {
//   store,
//   wrapper,
// };

// export default dataRedux;
