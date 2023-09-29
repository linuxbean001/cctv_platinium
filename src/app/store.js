import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import firstReducer from "./features/counter/counterSlice";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, firstReducer);
export const store = configureStore({
  reducer: {
    counter1: persistedReducer,
  },
});
export const persistor = persistStore(store);
