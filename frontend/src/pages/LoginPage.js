import React, { useEffect } from 'react'
import Login from '../components/Login/Login'
import {useNavigate} from 'react-router-dom'

function LoginPage() {
  const navigate=useNavigate();
  useEffect(() => {
    const token=localStorage.getItem('token');
    if(token){
      navigate('/userHome');
    }
  })
  
  return (
    <>
    <Login user='user' />
    </>
  )
}

export default LoginPage