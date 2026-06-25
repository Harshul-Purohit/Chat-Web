import React from 'react'
import SingleMessage from './SingleMessage'
import "../Form.css"
import UseGetMessages from '../Hooks/useGetMessages'

const Messages = () => {
  UseGetMessages();
  return (
    <div className="messages-box">
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      {/* Add more messages here */}
    </div>
  )
}

export default Messages
