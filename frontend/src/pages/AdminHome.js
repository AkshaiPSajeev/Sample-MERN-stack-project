import React,{useEffect,useState} from 'react'
import axios from 'axios';

import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import Header from '../components/Header/Header'
import {Table,Container, Button} from 'react-bootstrap';
import './AdminLogin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function AdminHome() {


  const navigate=useNavigate();
  const baseUrl='http://localhost:8081/admin';
  let [users, setUsers] = useState([]);
  let [state,setState]=useState(false);
  const [query,setQuery]=useState('');
  useEffect(() => {
    const admin=localStorage.getItem('admintoken');
    
    if(!admin){
      navigate('/admin');//redirecting to login page of admin if no admin token is there
    }else{
      getAllUsers();
    }
   
  },[state])

  const logout=()=>{
    localStorage.clear('admintoken');
    navigate('/admin')
  }
  const getAllUsers=()=>{
   axios({
      method:'get',
      url:baseUrl+'//getUsers',
      headers:{
        'token':localStorage.getItem('admintoken')
      }
   }).then((response)=>{
    console.log('hiiii')
    console.log(response.data.users);
      setUsers(response.data.users);
      console.log( 'here it is')
      console.log(users)
    }).catch((err)=>{
      logout();
    })
  }
  
  const blockUser=(userId)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Block user..",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Block'
    }).then((result) => {
        if (result.isConfirmed) {
         axios({
          method:'patch',
          url:baseUrl+'//blockUser',
          data:{
          userId:userId
           },
           headers:{
            'token':localStorage.getItem('admintoken')
          }
         }).then((response)=>{
            console.log(response);
            setState(state?false:true);
            Swal.fire(
             'Blocked!',
             'User has been blocked.',
             'success'
            )
         }).catch((err)=>{
            logout();
      })
          
       
      }
    })
   
  }
 
  const unblockUser=(userId)=>{
    axios(
      {
        method:'patch',
        url:baseUrl+'//unblockUser',
        data:{
          userId:userId
        },
        headers:{
          'token':localStorage.getItem('admintoken')
        }
      }
    ).then((response)=>{
      setState(state?false:true);
      Swal.fire({
   
        icon: 'success',
        title: 'user unblocked',
        showConfirmButton: false,
        timer: 1500
      })
    }).catch((err)=>{
      logout();
    })
}
  return (
    <>
    <Header user={'admin'} admin='true'/>

    <Container className='mt-5 pt-3'>
      <div className='adduserdiv'>
        <div>
     
      <Button onClick={()=>navigate('addUser')}>Add User</Button>
      </div>
      <div>
      <input type='text' onChange={(e)=>{setQuery(e.target.value)}} className='search' placeholder='Search...'  />
      </div>
      </div>
   
          <Table  className='mt-3'>
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Email</th>
         
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
    {
      users.filter(((user)=>{
        return (user.Name.toLowerCase().includes(query))||(user.Email.toLowerCase().includes(query))
       })).map((user,index)=>{
      
       return( <tr>
          <td>{index+1}</td> 
          <td>{user.Name}</td>
          <td>{user.Email}</td>
        
         <td>{user.Status?<span className='text-success'><strong>Active</strong></span>:<span className='text-danger'><strong>Blocked</strong></span>}</td>
         <td>{user.Status?<Button className='btn btn-primary' onClick={
          ()=>{
            blockUser(user._id);
          }
         }>Block</Button>:<Button className='btn btn-primary'onClick={
          ()=>{
            unblockUser(user._id);
          }
         }>Unblock</Button>}</td>
        </tr>)
       
    
      })
      }
        </tbody>
    </Table> 
    </Container>
      
      </>
  )
}

export default AdminHome