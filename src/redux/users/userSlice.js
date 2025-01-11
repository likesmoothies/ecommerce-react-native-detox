// Redux Toolkit Imports
import {createSlice} from '@reduxjs/toolkit';

const getInitialUsers = () => ({
  data: [],
});

// Find user based on email
const findUser = (users, email) => users.find(user => user.email === email);

const userSlice = createSlice({
  name: 'users',
  initialState: getInitialUsers(),
  reducers: {
    addUser(state, action) {
      state.data.push(action.payload);
    },

    removeUser(state, action) {
      state.data = state.data.filter(user => user.email !== action.payload);
    },

    updateUser(state, action) {
      const user = findUser(state.data, action.payload.email);
      if (user) {
        Object.assign(user, action.payload);
      }
    },
  },
});

export const {addUser, removeUser, updateUser} = userSlice.actions;
export default userSlice.reducer;

export const selectUsers = state => state.users.data;
