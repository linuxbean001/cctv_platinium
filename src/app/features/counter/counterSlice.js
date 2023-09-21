import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalOptions: 0,
  totalCamera: 0,
  selectedNVR :[],
  selectedCamera:[],
  selectedPoE:[]
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

    // For Camera
    setSelectedCamera:(state, action) => {
      state.selectedCamera.push(action.payload);
    },

     // For PoE Switches
     setSelectedPoE:(state, action) => {
      state.selectedPoE.push(action.payload);
    },

  },
});



export const { IncrementCamera, DecrementCamera,IncrementOptions,DecrementOptions,setSelectedNVR,setSelectedCamera,setSelectedPoE } = counterSlice.actions;
export default counterSlice.reducer;
