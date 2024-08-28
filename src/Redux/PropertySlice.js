// propertySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase-config/config';
import { collection, getDocs } from 'firebase/firestore';

// Async thunk for fetching properties
export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'properties'));
      const properties = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return properties;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const propertySlice = createSlice({
  name: 'properties',
  initialState: {
    properties: [],
    loading: true,
    error: null,
  },
  reducers: {
    addProperty: (state, action) => {
      state.properties.push(action.payload);
    },
    updateProperty: (state, action) => {
      const index = state.properties.findIndex((prop) => prop.id === action.payload.id);
      if (index !== -1) {
        state.properties[index] = action.payload;
      }
    },
    deleteProperty: (state, action) => {
      state.properties = state.properties.filter((prop) => prop.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addProperty, updateProperty, deleteProperty } = propertySlice.actions;
export default propertySlice.reducer;
