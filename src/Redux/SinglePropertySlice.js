// Redux/PropertySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase-config/config"; // Adjust the path as needed
import { doc, getDoc } from "firebase/firestore";

// Async thunk to fetch property by ID
export const fetchPropertyById = createAsyncThunk(
  "properties/fetchById",
  async (id) => {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }; // Return document data
    } else {
      throw new Error("No such document!");
    }
  }
);

const propertySlice = createSlice({
  name: "singleProperty",
  initialState: {
    property: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true; // Set loading to true when fetching
        state.error = null; // Reset error
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when fetched
        state.property = action.payload; // Set fetched property
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.error.message; // Set error message
      });
  },
});

// Export reducer
export default propertySlice.reducer;
