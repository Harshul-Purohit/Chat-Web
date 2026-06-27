import React from 'react'
import "../Form.css"
import { useSelector } from 'react-redux'

const SingleMessage = ({ type, message }) => {
  const { selectedUser, authUser } = useSelector(store => store.user)

  // Format timestamp nicely
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`single-message ${type}`}>
      {/* Chat Start (received) → avatar left */}
      {type === "start" && (
        <>
          <div className="chat-avatar">
            <img
              src={selectedUser?.profilePhoto}
              alt={selectedUser?.fullName || "User Avatar"}
            />
          </div>
          <div className="chat-bubble">
            <p>{message.message}</p>
            <span className="chat-time">{formattedTime}</span>
          </div>
        </>
      )}

      {/* Chat End (sent) → avatar right */}
      {type === "end" && (
        <>
          <div className="chat-bubble">
            <p>{message.message}</p>
            <span className="chat-time">{formattedTime}</span>
          </div>
          <div className="chat-avatar">
            <img
              src={authUser?.profilePhoto}
              alt={authUser?.fullName || "User Avatar"}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default SingleMessage
