import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import {setAuthUser, setOthersUsers } from '../Redux/userSlice';

const UseGetOtherUser = () => {
  const dispatch = useDispatch();
  const others = useSelector(state => state.user.othersUsers);

  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("http://localhost:2023/api/v1/user/", {
          withCredentials: true,
        });

        console.log("Fetched users:", res.data);
        // ✅ Only store the array
        dispatch(setAuthUser(res.data.self)); 
        dispatch(setOthersUsers(res.data.others));
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchOtherUser();
  }, [dispatch]);

  return (
    <div>
      <h3>Other Users</h3>
      {others && others.map(u => (
        <p key={u._id}>{u.userName} ({u.fullName})</p>
      ))}
    </div>
  );
};

export default UseGetOtherUser;
