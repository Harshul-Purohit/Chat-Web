import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    othersUsers: null,   // ✅ consistent naming
    selectedUser: null
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOthersUsers: (state, action) => {
      state.othersUsers = action.payload; // ✅ matches initialState
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    }
  },
});

export const { setAuthUser, setOthersUsers, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
