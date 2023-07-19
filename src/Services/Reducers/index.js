import { combineReducers } from "redux";
import cardItem from "./reducers";
import nvrData from "./nvrReducer";
import nvrInfoReducer from "./nvrInfoReducer";
import cameraNumber from "./cameraNumber";
import cameraLocation from "./cameraLocation";
import cameraTypeName from "./camereaTypeName";
import portsReducer from "./portsReducer";
import hardWareDetail from "./hardwareReducer";
import cableName from "./cableName";
export default combineReducers({
     cardItem:cardItem,
     nvrReducer:nvrData,
     nvrInfoReducer:nvrInfoReducer,
     cameraNumber:cameraNumber,
     cameraLocation:cameraLocation,
     cameraTypeName:cameraTypeName,
     portsReducer:portsReducer,
     hardWareDetail:hardWareDetail,
     cableName:cableName
})
