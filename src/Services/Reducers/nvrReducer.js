import { NUMBER_OF_CAMERA } from "../constant";
import { NVR_TYPE } from "../constant";
const initialState = {
  nvrData: [],
  // cameraLocation: [],
};
export default function nvrData(state = initialState.nvrData, action) {
  switch (action.type) {
    // case NUMBER_OF_CAMERA:
    //   console.log("nvr reducer", action);
    //   return [...state, { cameraNumber: action.item }];
    case NVR_TYPE:
      console.log("reducer_action", action);
      return [...state, { nvrType: action.data }];
      break;
    default:
      return state;
  }
}
