import React from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector } from 'react-redux'

const MessageContainer = () => {
  console.log("MessageContainer rendered");
  const {selectedUser} = useSelector(store=>store.user)
    if (!selectedUser) {
    return (
      <div className="chat-card">
        <p className="chat-placeholder">Select a user to start chatting</p>
      </div>
    );
  }
  return (
 <div className="chat-card">
  <div className="chat-users-box">
    <div className="chat-user-card">
      <div className="chat-avatar">
        <img
          src={selectedUser?.profilePhoto}
          alt="User Avatar"
        />
      </div>
      <div className="chat-user-info">
        <p className="chat-user-name">{selectedUser?.fullName}</p>
      </div>
    </div>
  </div>

  <div className="chat-divider"></div>

{selectedUser && (
  <>
    <Messages />
    <SendInput />
  </>
)}

</div>

  )
}

export default MessageContainer