import { createSlice } from "@reduxjs/toolkit";

const imagesSlice = createSlice({
  name: "images",
  initialState: {
    uploadedImages: [],
    uploadedFloorPlanImage: "",
    uploadedExteriorImage: "",
    uploadTypeImage: "",
    uploadExteriorDoorImage: "",
    uploadedKitchenImage: "",
    uploadedKitchenFlatCabinet: "",
    uploadedKitchenCabinetHardware: "",
    uploadKitchenTileBacksplash: "",
    uploadKitchenBacksplashTile: "",
    loading: false,
    error: null,
  },
  reducers: {
    setUploadedImages(state, action) {
      state.uploadedImages = action.payload;
    },
    // floor plan
    setUploadedFloorPlanImage(state, action) {
      state.uploadedFloorPlanImage = action.payload;
    },
    // Exterior
    setUploadedExteriorImage(state, action) {
      state.uploadedExteriorImage = action.payload;
    },
    setUploadedTypeImage(state, action) {
      state.uploadTypeImage = action.payload;
    },
    setUploadExteriorDoorImage(state, action) {
      state.uploadExteriorDoorImage = action.payload;
    },
    // Kithcen
    setUploadKitchenImage(state, action) {
      state.uploadedKitchenImage = action.payload;
    },
    setUploadKitchenFlatCabinet(state, action) {
      state.uploadedKitchenFlatCabinet = action.payload;
    },
    setUploadedKitchenCabinetHardware(state, action) {
      state.uploadedKitchenCabinetHardware = action.payload;
    },
    setUploadKitchenTileBacksplash(state, action) {
      state.uploadKitchenTileBacksplash = action.payload;
    },
    setUploadKitchenBacksplashTile(state, action) {
      state.uploadKitchenBacksplashTile = action.payload;
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

export const {
  setUploadedImages,
  setUploadedFloorPlanImage,
  setUploadedExteriorImage,
  setUploadedTypeImage,
  setUploadExteriorDoorImage,
  setUploadKitchenImage,
  setUploadKitchenFlatCabinet,
  setUploadedKitchenCabinetHardware,
  setUploadKitchenTileBacksplash,
  setUploadKitchenBacksplashTile,
  setLoading,
  setError,
} = imagesSlice.actions;

export default imagesSlice.reducer;
