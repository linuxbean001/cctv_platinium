import { combineReducers } from "redux";
import cardItem from "./reducers";
import nvrData from "./nvrReducer";
export default combineReducers({
     cardItem:cardItem,
     nvrReducer:nvrData
})
