import { ADD_TO_CARD } from "../constant";
import { CAMERA_LOCATION } from "../constant";
// const initialState = {
//   cardData: [],
//   cameraLocation: [],
// };
export default function cardItem(state = [], action) {
  switch (action.type) {
    case ADD_TO_CARD:
      console.log('reducer_action',action)
      return [...state, { cardData: action.data }];
    case CAMERA_LOCATION:
      console.log("reducer_action", action);
      return [...state, { cameraLocation: action.data }];
      break;
    default:
      return state;
  }
}
