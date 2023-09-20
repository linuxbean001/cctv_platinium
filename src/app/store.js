// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import firstReducer from './features/counter/counterSlice'; // Import your reducer(s)

const persistConfig = {
  key: 'root', // Key for storing data in storage
  storage, // Storage engine (e.g., localStorage)
  // Other configuration options as needed
};

const persistedReducer = persistReducer(persistConfig, firstReducer);

export const store = configureStore({
  reducer: {
    counter1: persistedReducer, // Use the persisted reducer
  },
});

export const persistor = persistStore(store);
