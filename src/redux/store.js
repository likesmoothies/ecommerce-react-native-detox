// Redux Toolkit Imports
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist'; // Persist utilities
import {apiSlice} from './api/apiSlice';
import productsReducer from './products/productsSlice';
import wishListReducer from './wishlist/wishlistsSlice';
import addressReducer from './address/addressSlice';
import authReducer from './auth/authSlice';
import searchbarReducer from './searchbar/searchbarSlice';
import productSizeReducer from './productSize/productSizeSlice';
import userReducer from './users/userSlice';

// Configurations for redux-persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'products',
    'wishListProducts',
    'address',
    'auth',
    'searchbar',
    'productSize',
    'users',
  ],
};

// Combine your reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  products: productsReducer,
  wishListProducts: wishListReducer,
  address: addressReducer,
  auth: authReducer,
  searchbar: searchbarReducer,
  productSize: productSizeReducer,
  users: userReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

// Export the persistor
export const persistor = persistStore(store);
