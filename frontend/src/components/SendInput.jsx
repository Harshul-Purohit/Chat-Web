import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { appendMessage } from '../Redux/messageSlice'; // ✅ import appendMessage
import "../Form.css";

const SendInput = () => {
  const [inputMessage, setInputMessage] = useState("");
  const { selectedUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedUser?._id) return;

    try {
      const res = await axios.post(
        `http://localhost:2023/api/v1/message/send/${selectedUser._id}`,
        { message: inputMessage },
        { withCredentials: true }
      );

      // ✅ Append new message instead of overwriting
      dispatch(appendMessage(res.data.newMessage));
      setInputMessage("");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="send-input-form">
      <div className="send-input-container">
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          type="text"
          className="send-input-field"
          placeholder="Type a message..."
        />
        <button type="submit" className="send-input-button">
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
