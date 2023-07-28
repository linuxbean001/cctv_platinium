import { ADD_TO_CARD } from "../constant";

const initialState = {
  cardData: [],

};
export default function cardItem(state = initialState.cardData, action) {

  switch (action.type) {
    case ADD_TO_CARD:
           return [...state, action.data];
   
    default:
      return state;
  }
}
