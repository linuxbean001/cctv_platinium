import { CAMERA_TYPE_NAME } from "../constant";

const initialState = {
  cameraTypeName: [],
};
export default function cameraTypeName(
  state = initialState.cameraTypeName,
  action
) {
  switch (action.type) {
    case CAMERA_TYPE_NAME:
      console.log("nvr reducer", action);
      return [...state, { cameraTypeName: action }];

      break;
    default:
      return state;
  }
}
