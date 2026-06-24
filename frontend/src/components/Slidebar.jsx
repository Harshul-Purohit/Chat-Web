import React from 'react'
import OthersUsers from './OthersUsers'
import {BiSearchAlt2} from "react-icons/bi"
import "../Form.css";
 import axios from 'axios';
 import toast from 'react-hot-toast'
 import {useNavigate} from 'react-router-dom'

const Slidebar = () => {

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




  return (

<div className="home-layout">
  {/* Left sidebar box */}
  <div className="home-sidebar">
    <form>
      <input type="text" placeholder="Search..." />
      <button type="submit">
        <BiSearchAlt2 />
      </button>
    </form>

    {/* Divider */}
    <div className="divider"></div>

    {/* Other Users */}
    <div className="other-users">
      <OthersUsers />
  
    </div>

    <button className="logout-btn"  onClick={logoutHandler} >Logout</button>

  </div>

  
</div>




  )
}

export default Slidebar