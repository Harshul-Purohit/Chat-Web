import React from 'react'

const OtherUser = (props) => {
  const user = props.user;
  return (
   <div className="other-users-box">
      <div className="user-card">
        <div className="avatar">
          <img
            src={user?.profilePhoto}
            alt="User Avatar"
          />
        </div>
        <div className="user-info">
          <p className="user-name">{user?.fullName}</p>
        </div>
      </div>

      <div className="divider"></div>

    </div>
  )
}

export default OtherUser