import React from 'react'
import Slidebar from './Slidebar'
import MessageContainer from './MessageConainer'
 import "../Form.css"

const HomePage = () => {
  return (
    <div  className="home-box" >
      <Slidebar/>
      <MessageContainer/>
    </div>
  )
}

export default HomePage