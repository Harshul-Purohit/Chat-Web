import React from 'react'
import { IoSend } from "react-icons/io5"
import "../Form.css";  // import the CSS file

const SendInput = () => {
  return (
    <form className="send-input-form" action="">
      <div className="send-input-container">
        <input 
          type="text" 
          className="send-input-field"
          placeholder="Type a message..."
        />
        <button className="send-input-button">
          <IoSend />
        </button>
      </div>
    </form>
  )
}

export default SendInput
