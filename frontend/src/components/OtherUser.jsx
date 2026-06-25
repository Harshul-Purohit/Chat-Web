import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../Redux/userSlice'

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user);

  const SelectUserHandler = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      onClick={SelectUserHandler}
      className={`other-users-box ${selectedUser?._id === user?._id ? 'selected' : ''}`}
    >
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
  );
};

export default OtherUser;
