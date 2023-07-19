import { ADD_TO_CARD, NUMBER_OF_CAMERA } from "../constant";
import { CAMERA_LOCATION } from "../constant";
import { NVR_TYPE } from "../constant";
import { NVR_DETAILS } from "../constant";
import { CAMERA_TYPE_NAME } from "../constant";
import { PORTS_REDUCER } from "../constant";
import { HARDWARE_REDUCER } from "../constant";

import { CABLE_NAME } from "../constant";

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
  console.log(data);
  return {
    type: NVR_TYPE,
    data: data,
  };
};

export const nvrDetails = (data) => {
  console.log(data);
  return {
    type: NVR_DETAILS,
    data: data,
  };
};
export const cameraNumber = (data) => {
  console.log(data);
  return {
    type: NUMBER_OF_CAMERA,
    data: data,
  };
};

export const cameraType = (data) => {
  console.log(data);
  return {
    type: CAMERA_TYPE_NAME,
    data: data,
  };
};

export const portTypes = (data) => {
  console.log(data);
  return {
    type: PORTS_REDUCER,
    data: data,
  };
};

export const hardwareTypes = (data) => {
  return {
    type: HARDWARE_REDUCER,
    data: data,
  };
};

export const cableName = (data) => {
  return {
    type: CABLE_NAME,
    data: data,
  };
};
