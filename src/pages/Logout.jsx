
import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'



const Logout = () => {
  const navigate= useNavigate()
  const {setCurrentUser} = useContext(UserContext)
  setCurrentUser(null)
  navigate("/login")
  return (
    <>
      
    </>
  )
}

export default Logout
