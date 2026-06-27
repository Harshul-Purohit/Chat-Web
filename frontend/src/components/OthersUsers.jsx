import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUser from '../Hooks/useGetOtherUser';
import { useSelector } from 'react-redux';

const OthersUsers = () => {
  // Call the hook properly
  useGetOtherUser();

  // Use consistent naming
  const othersUsers = useSelector(store => store.user.othersUsers);

  if (!othersUsers) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="others-users-list">
      {othersUsers.map(user => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OthersUsers;
