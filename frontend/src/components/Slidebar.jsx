import React from 'react'
import OthersUsers from './OthersUsers'
import {BiSearchAlt2} from "react-icons/bi"

const Slidebar = () => {
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

    <button className="logout-btn">Logout</button>

  </div>

  
</div>




  )
}

export default Slidebar