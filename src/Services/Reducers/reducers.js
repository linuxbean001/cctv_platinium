import { ADD_TO_CARD } from "../constant";
import { CAMERA_LOCATION } from "../constant";
const initialState = {
  cardData: [],
  // cameraLocation: [],
};
export default function cardItem(state = initialState.cardData, action) {
  switch (action.type) {
    case ADD_TO_CARD:
     
      return [...state, action.data];
    // case CAMERA_LOCATION:
    //        return [...state, { cameraLocation:action.data }];
    //   break;
    default:
      return state;
  }
}
