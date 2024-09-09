import { createSlice } from "@reduxjs/toolkit";


const imagesSlice = createSlice({
  name: "images",
  initialState: {
    uploadedImages: [],
    uploadedFloorPlanImage:"",
    loading: false,
    error: null,
  },
  reducers: {
    setUploadedImages(state, action) {
      state.uploadedImages = action.payload;
    },
    setUploadedFloorPlanImage(state,action){
       state.uploadedFloorPlanImage = action.payload    
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUploadedImages, setUploadedFloorPlanImage, setLoading, setError } = imagesSlice.actions;

export default imagesSlice.reducer;
