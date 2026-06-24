// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// import OthersUsers from "../components/OthersUsers";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers:null
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOthersUsers:(state,action)=>{
      state.othersUsers = action.payload;
    }
  },
});

export const { setAuthUser,setOthersUsers } = userSlice.actions;
export default userSlice.reducer;
