// Redux Toolkit Imports
import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getInitialSearchbarText = async () => {
  const searchbarText = await AsyncStorage.getItem('searchbarText');
  return searchbarText ? JSON.parse(searchbarText) : '';
};

const searchbarSlice = createSlice({
  name: 'searchbar',
  initialState: {
    searchbarText: getInitialSearchbarText(),
  },
  reducers: {
    setSearchbarText(state, action) {
      state.searchbarText = action.payload;
    },
  },
});

export const {setSearchbarText} = searchbarSlice.actions;
export default searchbarSlice.reducer;

export const selectSearchbarText = state => state.searchbar.searchbarText;
