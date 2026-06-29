import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    allUsers: [],       // full list from backend
    othersUsers: [],    // filtered/display list
    selectedUser: null
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
      state.othersUsers = action.payload; // initialize display list
    },
    setOthersUsers: (state, action) => {
      state.othersUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    }
  },
});

export const { setAuthUser, setAllUsers, setOthersUsers, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;

