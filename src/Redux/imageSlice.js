import { createSlice } from "@reduxjs/toolkit";

const imagesSlice = createSlice({
  name: "images",
  initialState: {
    uploadedImages: [],
    loading: false,
    error: null,
  },
  reducers: {
    setUploadedImages(state, action) {
      state.uploadedImages = action.payload;
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

export const { setUploadedImages, setLoading, setError } = imagesSlice.actions;

export default imagesSlice.reducer;
