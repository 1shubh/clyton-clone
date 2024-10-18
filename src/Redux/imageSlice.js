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
    uploadKitchenFaucetImage: "",
    uploadOptionImage: "",
    UploadBathroomImage: "",
    uploadFlooringMaterialImage: "",
    uploadKitchenFlooringImage: "",
    uploadLeavingRoomImage: "",
    uploadBedroomImage: "",
    uploadAppliancesImage: "",
    uploadAppliancePackageImage: "",
    uploadCustomeImages:"",
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
    setUploadKitchenFaucet(state, action) {
      state.uploadKitchenFaucetImage = action.payload;
    },
    setUploadOptionImage(state, action) {
      state.uploadOptionImage = action.payload;
    },
    setUploadBathroomImage(state, action) {
      state.UploadBathroomImage = action.payload;
    },
    setUploadFlooringMaterialImage(state, action) {
      state.uploadFlooringMaterialImage = action.payload;
    },
    setUploadKitchenFlooringImage(state, action) {
      state.uploadKitchenFlooringImage = action.payload;
    },
    setUploadLeavingRoomImage(state, action) {
      state.uploadLeavingRoomImage = action.payload;
    },
    setUploadBedroomImage(state, action) {
      state.uploadBedroomImage = action.payload;
    },
    setUploadAppliancesImage(state, action) {
      state.uploadAppliancesImage = action.payload;
    },
    setUploadAppliancesPackageImage(state, action) {
      state.uploadAppliancePackageImage = action.payload;
    },
    setUploadCustomImages(state, action) {
      state.uploadCustomeImages = action.payload;
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
  setUploadKitchenFaucet,
  setUploadOptionImage,
  setUploadBathroomImage,
  setUploadFlooringMaterialImage,
  setUploadKitchenFlooringImage,
  setUploadLeavingRoomImage,
  setUploadBedroomImage,
  setUploadAppliancesImage,
  setUploadAppliancesPackageImage,
  setUploadCustomImages,
  setLoading,
  setError,
} = imagesSlice.actions;

export default imagesSlice.reducer;
