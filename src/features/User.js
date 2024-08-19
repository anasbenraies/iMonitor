import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Define your initial state here
  currentUser:{},
  counter:0,
  devicesUsages:[]
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser:(state,action)=>{
        Object.assign(state.currentUser, action.payload);
    },
    clearUser:(state,action)=>{
      state.currentUser={}
    },
    increment:(state,action)=>{
      state.counter += action.payload;
    },decrement:(state,action)=>{
      state.counter -= action.payload;
    },
    setDevicesUsages:(state,action)=>{
        state.devicesUsages=action.payload;
    },
     initializeFromLocalStorage(state) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
        if (currentUser) {
          // state.currentUser.id = currentUser.id;
          // state.currentUser.username = currentUser.username;
          // state.currentUser.email = currentUser.email;
          // state.currentUser.dob=currentUser.dob;
          Object.assign(state.currentUser, currentUser);
        }
      }
  },
});

export const { increment,decrement, setCurrentUser,clearUser,setDevicesUsages ,initializeFromLocalStorage} = UserSlice.actions;
export default UserSlice.reducer;
