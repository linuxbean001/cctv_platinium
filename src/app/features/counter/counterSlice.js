import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalOptions: 0,
  totalCamera: 0,


  selectedNVR: [],
  selectedCamera: [],
  selectedCabling: [],
  selectedLabor: [],
  selectedPoE: [],
  selectedHardWare: [],
  selectedSpecial: [],
  finalData: [],
  customerData: [],
  apiDATA:null,
  selectedNumberOfDrops:null,
  totalCablesSelected:null,
  customData:[]
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {

// Increment and Deceremnt Camera and Options Starts

    IncrementCamera: (state) => {
      state.totalCamera += 1;
    },
    DecrementCamera: (state) => {
      state.totalCamera -= 1;
    },

    IncrementCameraByFive: (state) => {
      state.totalCamera += 5;
    },
    IncrementCameraByTen: (state) => {
      state.totalCamera += 10;
    },

    
    deleteCameraByTen: (state) => {
      state.totalCamera -= 10;
    },


    IncrementOptions: (state) => {
      state.totalOptions += 1;
    },
    DecrementOptions: (state) => {
      state.totalOptions -= 1;
    },

// Increment and Deceremnt Camera and Options Ends

    ResetCounters: (state) => {
      state.totalOptions = state.initialOptions;
      state.totalCamera = state.initialCamera;
    },
    setSelectedNVR: (state, action) => {
      state.selectedNVR.push(action.payload);
    },

    deleteNVR: (state, action) => {
      state.selectedNVR.splice(action.payload, 1);
    },

    setSelectedCamera: (state, action) => {
      state.selectedCamera.push(action.payload);
    },

    deleteCamera: (state, action) => {
      state.selectedCamera.splice(action.payload, 1);
    },

    deletePoe: (state, action) => {
      state.selectedPoE.splice(action.payload, 1);
    },

    setSelectedCabling: (state, action) => {
      if (!Array.isArray(state.selectedCabling)) {
        state.selectedCabling = [];
      }
      state.selectedCabling.push(action.payload);
    },

    deleteCabling: (state, action) => {
      const index = action.payload;
      state.selectedCabling.splice(index, 1);
    },

    setSelectedLabor: (state, action) => {
      if (!Array.isArray(state.selectedLabor)) {
        state.selectedLabor = [];
      }
      state.selectedLabor.push(action.payload);
    },

    deleteLabor: (state, action) => {
      const index = action.payload;
      state.selectedLabor.splice(index, 1);
    },

    setSelectedSpecial: (state, action) => {
      state.selectedSpecial.push(action.payload);
    },

    deleteSpecial: (state, action) => {
      state.selectedSpecial.splice(action.payload, 1);
    },

    setSelectedPoE: (state, action) => {
      state.selectedPoE.push(action.payload);
    },

    setSelectedHardWare: (state, action) => {
      state.selectedHardWare = action.payload;
    },

    setFinalData: (state, action) => {
      state.finalData = action.payload;
    },
    setCustomerData: (state, action) => {
      state.customerData = action.payload;
    },
    // API DATA
    setAPIDATA: (state, action) => {
      state.apiDATA = action.payload;
    },
    // Number of Drops
    setSelectedNumberOfDrops: (state, action) => {
      state.selectedNumberOfDrops = action.payload;
    },
       // Total Cables Selected
       setTotalCablesSelected: (state, action) => {
        state.totalCablesSelected = action.payload;
      },

    //Custom Data
    setCustomData: (state, action) => {
      state.customData = action.payload;
    },
  },
});

export const {
  IncrementCamera,
  DecrementCamera,

  IncrementCameraByFive,
  IncrementCameraByTen,

  deleteCameraByTen,

  IncrementOptions,
  DecrementOptions,
  setSelectedNVR,
  setSelectedCamera,
  setSelectedCabling,
  setSelectedLabor,
  setSelectedPoE,
  setSelectedHardWare,
  setSelectedSpecial,
  setCustomerData,
  setAPIDATA,
  setFinalData,
  deleteCamera,
  deleteNVR,
  deleteCabling,
  deleteLabor,
  deleteSpecial,
  deletePoe,
  ResetCounters,
  setSelectedNumberOfDrops,
  setTotalCablesSelected,
  setCustomData
} = counterSlice.actions;
export default counterSlice.reducer;
