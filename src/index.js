import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { legacy_createStore as createStore, combineReducers ,applyMiddleware} from "redux";
import { Provider } from "react-redux";
import rootReducer from "./Services/Reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from 'redux-persist/lib/storage'
import 'bootstrap/dist/css/bootstrap.min.css';

const persistConfig = {
  key: "bill_Details",
  storage,
};


const persistdReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistdReducer);
const persister = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
