import React from 'react'

const MessageContainer = () => {
  return (
  <div className="chat-users-box">
  <div className="chat-user-card">
    <div className="chat-avatar">
      <img
        // src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
        alt="User Avatar"
      />
    </div>
    <div className="chat-user-info">
      <p className="chat-user-name">Harshul</p>

    </div>
  </div>

  <div className="chat-divider"></div>
</div>

  )
}

export default MessageContainer