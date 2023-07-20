import { NUMBER_OF_CAMERA } from "../constant";
import { NVR_TYPE } from "../constant";
const initialState = {
  nvrData: [],
  // cameraLocation: [],
};
export default function nvrData(state = initialState.nvrData, action) {
  switch (action.type) {
  
    case NVR_TYPE:
      console.log("reducer_action", action);
      return [...state, { nvrData: action.data }];
      break;
    default:
      return state;
  }
}
