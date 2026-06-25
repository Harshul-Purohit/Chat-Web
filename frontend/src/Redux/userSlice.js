// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// import OthersUsers from "../components/OthersUsers";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers:null,
    selectedUser : null
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOthersUsers:(state,action)=>{
      state.othersUsers = action.payload;
    },
    setSelectedUser:(state,action)=>{
      state.selectedUser = action.payload;
    }
  },
});

export const { setAuthUser,setOthersUsers,setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
