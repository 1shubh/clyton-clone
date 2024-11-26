import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./imageSlice";
import propertyReducer from "./PropertySlice";
import loaderReducer from "./loaderSlice";
import singleProperty from "./SinglePropertySlice";
import orderStatusReducer from "./orderStatusSlice";

export const store = configureStore({
  reducer: {
    images: imagesReducer,
    properties: propertyReducer,
    single: singleProperty,
    loader: loaderReducer,
    orderStatus: orderStatusReducer,
  },
});
