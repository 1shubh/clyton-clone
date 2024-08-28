import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./imageSlice";
import propertyReducer from "./PropertySlice"
import loaderReducer from "./loaderSlice"

export const store = configureStore({
  reducer: {
    images: imagesReducer,
    properties:propertyReducer,
    loader: loaderReducer,
  },
});
