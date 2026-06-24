import React from 'react'
import OtherUser from './OtherUser'
import UseGetOtherUser from '../Hooks/UseGetOtherUser'
import { useSelector } from 'react-redux'

const OthersUsers = () => {
  // ✅ Call the hook properly
  UseGetOtherUser();

  // ✅ Use consistent naming
  const othersUsers = useSelector(store => store.user.othersUsers);

  if (!othersUsers) return null;

  return (
    <div>
      {othersUsers.map(user => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OthersUsers;
