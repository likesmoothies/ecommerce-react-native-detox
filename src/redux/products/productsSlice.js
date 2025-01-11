// Redux Toolkit Imports
import {createSlice} from '@reduxjs/toolkit';

// Function to get the initial products state
const getInitialProducts = () => ({
  data: [], // Store products in cart
});

// Utility function to find the index of a product in the cart
const findProductIndex = (cart, productId) => {
  return cart.findIndex(product => product.id === productId);
};

const productsSlice = createSlice({
  name: 'products',
  initialState: getInitialProducts(),
  reducers: {
    setCartProducts(state, action) {
      const product = action.payload;
      const existingProductIndex = findProductIndex(state.data, product.id);

      if (existingProductIndex >= 0) {
        // If product already exists in the cart, increment the quantity
        state.data[existingProductIndex].quantity += 1;
      } else {
        // Add new product to the cart with initial quantity of 1
        state.data.push({...product, quantity: 1});
      }
    },

    incrementProductQuantity(state, action) {
      const productId = action.payload;
      const existingProductIndex = findProductIndex(state.data, productId);

      if (existingProductIndex >= 0) {
        state.data[existingProductIndex].quantity += 1;
      }
    },

    decrementProductQuantity(state, action) {
      const productId = action.payload;
      const existingProductIndex = findProductIndex(state.data, productId);

      if (
        existingProductIndex >= 0 &&
        state.data[existingProductIndex].quantity > 1
      ) {
        state.data[existingProductIndex].quantity -= 1;
      } else {
        // Remove the product from the cart if quantity goes below 1
        state.data = state.data.filter(product => product.id !== productId);
      }
    },

    removeProduct(state, action) {
      const productId = action.payload;
      state.data = state.data.filter(product => product.id !== productId);
    },

    // New action to clear all products
    clearCart(state) {
      state.data = [];
    },
  },
});

export const {
  setCartProducts,
  incrementProductQuantity,
  decrementProductQuantity,
  removeProduct,
  clearCart,
} = productsSlice.actions;
export default productsSlice.reducer;

// Selector to get the cart products
export const selectedProducts = state => state.products?.data;
