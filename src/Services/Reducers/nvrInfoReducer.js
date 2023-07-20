import { NVR_DETAILS } from "../constant";

const initialState = {
  nvrDetails: [],
};
export default function nvrInfoReducer(
  state = initialState.nvrDetails,
  action
) {
  switch (action.type) {
    case NVR_DETAILS:
      console.log("nvr detais", action);
      return [...state,  action.data ];

      break;
    default:
      return state;
  }
}
