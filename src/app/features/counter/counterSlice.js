import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalOptions: 0,
  totalCamera: 0,
  selectedNVR :[],
  selectedCamera:[]
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // For PopUp Modals
    IncrementCamera: (state) => {
      state.totalCamera += 1;
    },
    DecrementCamera: (state) => {
      state.totalCamera -= 1;
    },
    IncrementOptions: (state) => {
      state.totalOptions += 1;
    },
    DecrementOptions: (state) => {
      state.totalOptions -= 1;
    },
    // For NVR
    setSelectedNVR: (state, action) => {
      state.selectedNVR.push(action.payload);
    },

  },
});



export const { IncrementCamera, DecrementCamera,IncrementOptions,DecrementOptions,setSelectedNVR } = counterSlice.actions;
export default counterSlice.reducer;
