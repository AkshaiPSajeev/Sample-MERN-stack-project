import React from 'react'
import Header from '../components/Header/Header'
import RegisterUser from '../components/Users/RegisterUser'

function AddUser() {
  return (
   <>
   <Header  user={'admin'} admin='true'></Header>
    <RegisterUser/>
   </>
  )
}

export default AddUser