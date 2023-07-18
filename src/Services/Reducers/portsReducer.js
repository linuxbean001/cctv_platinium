import { PORTS_REDUCER } from "./../constant";
const initialState = {
  portDetails: [],
};
export default function portsReducer(state = initialState.portDetails, action) {
  switch (action.type) {
    case PORTS_REDUCER:
      console.log("nvr reducer", action);
      return [...state, { portDetails: action.data }];

      break;
    default:
      return state;
  }
}
