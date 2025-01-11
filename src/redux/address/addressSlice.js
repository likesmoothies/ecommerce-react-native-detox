// Redux Toolkit Imports
import {createSlice} from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    data: [],
    defaultAddress: null,
  },
  reducers: {
    // Set the entire address list
    setDefaultAddress(state, action) {
      const id = action.payload;

      // Reset default status for all addresses
      state.data.forEach(address => {
        address.isDefault = false; // Remove default status from all addresses
      });

      // Set the selected address as default
      const index = state.data.findIndex(address => address.id === id);
      if (index !== -1) {
        state.data[index].isDefault = true; // Mark this address as default
        state.defaultAddress = id; // Store the default address ID
      }
    },
    // Add a new address
    addAddress(state, action) {
      state.data.push(action.payload);
    },
    // Update an existing address
    updateAddress(state, action) {
      const {id, updatedAddress} = action.payload;
      const index = state.data.findIndex(address => address.id === id);
      if (index !== -1) {
        state.data[index] = {...state.data[index], ...updatedAddress};
      }
    },
    // Delete an address by ID
    deleteAddress(state, action) {
      const id = action.payload;
      state.data = state.data.filter(address => address.id !== id);
      // Remove defaultAddress if it was deleted
      if (state.defaultAddress === id) {
        state.defaultAddress = null; // Clear default address if deleted
      }
    },
  },
});

// Export actions
export const {setDefaultAddress, addAddress, updateAddress, deleteAddress} =
  addressSlice.actions;

// Export reducer
export default addressSlice.reducer;

// Selector to access address data
export const selectAddress = state => state.address.data;
export const selectDefaultAddress = state => state.address.defaultAddress;
