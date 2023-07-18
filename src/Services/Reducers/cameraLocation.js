import { ADD_TO_CARD } from "../constant";
import { CAMERA_LOCATION } from "../constant";
const initialState = {
   cameraLocation: [],
};
export default function cameraLocation(state = initialState.cameraLocation, action) {
  switch (action.type) {
    case CAMERA_LOCATION:
      console.log("nvr reducer", action);
      return [...state, { cameraLocation: action.data }];

      break;
    default:
      return state;
  }
}
