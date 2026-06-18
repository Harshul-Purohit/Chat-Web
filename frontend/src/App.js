import React from 'react';
import Signup from "./components/Signup.jsx";
import Homepage from "./components/Homepage.jsx"
import Login from "./components/Login.jsx"
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
  {
    path:"/",
    element:<Homepage/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  }
])

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;   
