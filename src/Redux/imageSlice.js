import { createSlice } from "@reduxjs/toolkit";


const imagesSlice = createSlice({
  name: "images",
  initialState: {
    uploadedImages: [],
    uploadedFloorPlanImage:"",
    uploadedExteriorImage:"",
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
    setUploadedExteriorImage(state,action){
     state.uploadedExteriorImage = action.payload
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

export const { setUploadedImages, setUploadedFloorPlanImage,setUploadedExteriorImage, setLoading, setError } = imagesSlice.actions;

export default imagesSlice.reducer;
