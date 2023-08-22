import { ADD_TO_CARD } from "../constant";
export const INCREMENTOPT = 'INCREMENTOPT';
export const DECREMENTOPT = 'DECREMENTOPT';

export const addToCart = (data) => {
  console.log("action", data);
  return {
    type: ADD_TO_CARD,
    data: data,
  };
};

// Options Starts
export const incrementOpt = () => ({
  type: INCREMENTOPT,
});
export const decrementOpt = () => ({
  type: DECREMENTOPT,
});
// Options Ends


