import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

function storeCreator(reducer) {
  return configureStore({
    reducer,
  });
}

export default storeCreator(reducers);
