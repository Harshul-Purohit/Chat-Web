import React from 'react'
import "../Form.css"

const SingleMessage = ({ type, text }) => {
  return (
    <div className={`single-message ${type}`}>
      {/* Chat Start (received) → avatar left */}
      {type === "start" && (
        <>
          <div className="chat-avatar">
            <img
              src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              alt="User Avatar"
            />
          </div>
          <div className="chat-bubble">
            <p>Hello!</p>
          </div>
        </>
      )}

      {/* Chat End (sent) → avatar right */}
      {type === "end" && (
        <>
          <div className="chat-bubble">
            <p>{text}</p>
          </div>
          <div className="chat-avatar">
            <img
              src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              alt="User Avatar"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default SingleMessage
