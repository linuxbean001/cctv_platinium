import { CABLE_NAME } from "../constant";
const initialState = {
  cableName: [],
};
export default function cableName(state = initialState.cableName, action) {
  switch (action.type) {
    case CABLE_NAME:
      console.log("cable  reducer", action);
      return [...state, { cableName: action.data }];

      break;
    default:
      return state;
  }
}
