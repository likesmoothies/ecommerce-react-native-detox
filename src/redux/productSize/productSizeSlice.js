// Redux Toolkit Imports
import {createSlice} from '@reduxjs/toolkit';

// Function to get the initial products state
const getInitialProducts = () => ({
  initialData: [], // Store products in cart
});

// Utility function to find the index of a product in the cart
const findProductIndex = (cart, productId) => {
  return cart.findIndex(product => product.id === productId);
};

const productSizeSlice = createSlice({
  name: 'productSize',
  initialState: getInitialProducts(),
  reducers: {
    setProductSizeStore(state, action) {
      const product = action.payload;

      // Ensure state.initialData is always an array
      state.initialData = state.initialData || [];

      const existingProductIndex = findProductIndex(
        state.initialData,
        product.id,
      );

      if (existingProductIndex >= 0) {
        // If product already exists in the cart, update its size
        state.initialData[existingProductIndex].size = product.size;
      } else {
        // Add new product to the cart
        state.initialData.push({...product});
      }
    },

    // New action to clear all products
    clearProductSizeStore(state) {
      state.initialData = [];
    },
  },
});

// Export actions and reducer
export const {setProductSizeStore, clearProductSizeStore} =
  productSizeSlice.actions;
export default productSizeSlice.reducer;

// Selector to get product sizes
export const selectProductSize = state => state.productSize.initialData;
