import { NUMBER_OF_CAMERA } from "../constant";

const initialState = {
  cameraNumbers: [],
};
export default function cameraNumber(state = initialState.cameraNumbers, action) {
  switch (action.type) {
    case NUMBER_OF_CAMERA:
      console.log("nvr reducer", action);
      return [...state,  action.data ];
  
      break;
    default:
      return state;
  }
}
