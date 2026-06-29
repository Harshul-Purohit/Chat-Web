import React, { useState } from 'react';
import OthersUsers from './OthersUsers';
import { BiSearchAlt2 } from "react-icons/bi";
import "../Form.css";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setOthersUsers } from '../Redux/userSlice';

const Slidebar = () => {
  const [search, setSearch] = useState("");
const { allUsers, othersUsers } = useSelector(store => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post("http://localhost:2023/api/v1/user/logout", {}, {
        withCredentials: true
      });
      toast.success(res.data.message || "Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

const searchSubmitHandler = (e) => {
  e.preventDefault();
  const query = search.trim().toLowerCase();

  if (!query) {
    dispatch(setOthersUsers(allUsers)); // reset to full list
    return;
  }

  const filteredUsers = allUsers.filter(user =>
    user.fullName.toLowerCase().includes(query) ||
    user.userName.toLowerCase().includes(query)
  );

  if (filteredUsers.length > 0) {
    dispatch(setOthersUsers(filteredUsers));
    toast.success(`${filteredUsers.length} user(s) found`);
  } else {
    toast.error("No matching user found!");
  }
};


  return (
    <div className="home-layout">
      <div className="home-sidebar">
        <form onSubmit={searchSubmitHandler}>
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
          />
          <button type="submit">
            <BiSearchAlt2 />
          </button>
        </form>

        <div className="divider"></div>

        <div className="other-users">
          <OthersUsers />
        </div>

        <button className="logout-btn" onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default Slidebar;
