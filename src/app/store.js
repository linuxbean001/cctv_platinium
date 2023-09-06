import { configureStore } from "@reduxjs/toolkit";
import firstReducer from "./features/counter/counterSlice"

export const store = configureStore({
  reducer: {
    counter1: firstReducer

  },
});
