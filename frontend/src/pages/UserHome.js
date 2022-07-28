import React,{useEffect,useState} from 'react'
import Header from '../components/Header/Header'
import {useNavigate} from 'react-router-dom'

function UserHome() {
const navigate=useNavigate();
const [username,setUsername]=useState('');
useEffect(() => {
let user=localStorage.getItem('userName');
setUsername(user);  
if(!user){
navigate('/');
}
}, [])

  return (
    <>
    <Header username={username} user='user'/> 
    </>
  )
}

export default UserHome