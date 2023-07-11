import { ADD_TO_CARD } from "../constant";
import { CAMERA_LOCATION } from "../constant";
import {NVR_TYPE} from "../constant"

export const addToCart = (data) => {
  console.log("action", data);
  return {
    type: ADD_TO_CARD,
    data: data,
  };
};

export const cameraLocation = (data) => {
  console.log("action", data);
  return {
    type: CAMERA_LOCATION,
    data: data,
  };
};

export const removeToCart = (data) => {
  return {
    type: "REMOVE_ITEM",
    data: data,
  };
};
export const nvrType = (data) => {
  return {
    type: NVR_TYPE,
    data: data,
  };
};
