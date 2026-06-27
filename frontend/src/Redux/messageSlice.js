import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: { messages: [] },
  reducers: {
    // Overwrite messages (used when fetching from backend)
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    // Append a single new message (used when sending)
    appendMessage: (state, action) => {
      state.messages.push(action.payload);
    }
  }
});

export const { setMessages, appendMessage } = messageSlice.actions;
export default messageSlice.reducer;
