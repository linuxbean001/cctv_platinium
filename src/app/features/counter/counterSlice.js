import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalOptions: 0,
  totalCamera: 0,
  selectedNVR: [],
  selectedCamera: [],
  selectedCabling: [],
  selectedLabor : [],
  selectedPoE: [],
  selectedHardWare: [],
  finalData : []
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

    // Remove Selected NVR
    deleteNVR: (state, action) => {
      state.selectedNVR.splice(action.payload, 1);
    },

    // For Camera
    setSelectedCamera: (state, action) => {
      state.selectedCamera.push(action.payload);
    },

    //************** Remove Selected Camera **************//
    deleteCamera: (state, action) => {
      state.selectedCamera.splice(action.payload, 1);
    },
    //************** Remove Selected Camera **************//

    //********************* Cabling *********************//
    setSelectedCabling: (state, action) => {
      if (!Array.isArray(state.selectedCabling)) {
        state.selectedCabling = [];
      }
      state.selectedCabling.push(action.payload);
    },
    //********************* Cabling **********************//

    //************** Remove Selected Cabling **************//
    deleteCabling: (state, action) => {
      const index = action.payload;
      state.selectedCabling.splice(index, 1);
    },
    //************** Remove Selected Cabling **************//

    //********************* Cabling *********************//
    setSelectedLabor: (state, action) => {
      if (!Array.isArray(state.selectedLabor)) {
        state.selectedLabor = [];
      }
      state.selectedLabor.push(action.payload);
    },
    //********************* Cabling **********************//

    //************** Remove Selected Cabling **************//
    deleteLabor: (state, action) => {
      const index = action.payload;
      state.selectedLabor.splice(index, 1);
    },
    //************** Remove Selected Cabling **************//

    // For PoE Switches
    setSelectedPoE: (state, action) => {
      state.selectedPoE.push(action.payload);
    },

    // For HardWare
    setSelectedHardWare: (state, action) => {
      state.selectedHardWare = action.payload;
    },
    // For HardWare
    setFinalData: (state, action) => {
      state.finalData = action.payload;
    },
  },
});

export const {
  IncrementCamera,
  DecrementCamera,
  IncrementOptions,
  DecrementOptions,
  setSelectedNVR,
  setSelectedCamera,
  setSelectedCabling,
  setSelectedLabor,
  setSelectedPoE,
  setSelectedHardWare,
  setFinalData,
  deleteNVR,
  deleteCamera,
  deleteCabling,
  deleteLabor
} = counterSlice.actions;
export default counterSlice.reducer;