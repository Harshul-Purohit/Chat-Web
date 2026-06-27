import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../Redux/userSlice';

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user);

  const handleSelectUser = () => {
    console.log("Clicked:", user._id);
    dispatch(setSelectedUser(user));
  };

  const isSelected = selectedUser?._id === user?._id;

  return (
    <div
      onClick={handleSelectUser}
      className={`other-users-box ${isSelected ? 'selected' : ''}`}
    >
      <div className="user-card">
        <div className="avatar">
          <img src={user?.profilePhoto} alt="User Avatar" />
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
