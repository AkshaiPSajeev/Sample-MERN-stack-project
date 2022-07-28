import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Form,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Login from '../components/Login/Login'

function AdminLogin() {
    const baseUrl='http://localhost:8081/admin/login'
    const navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState(false);
    const [errorMessage,setErrorMessage]=useState('');

  useEffect(() => {
    const admin=localStorage.getItem('admintoken');
    if(admin){
      navigate('/adminHome');
    }
  })
    const submitFormData=(e)=>{
      e.preventDefault();
      axios.post(baseUrl,
        {
          
            email:email,
            password:password
          
        }).then((response)=>{
          console.log(response)
          if(response.data.status==='ok'){
          
            localStorage.setItem('admintoken',response.data.token);
          
            navigate('/adminHome')
          }else{
            setError(true);
            setErrorMessage('invalid user name or password');
          }
        })
    }
  return (
    <>
    <Login user='admin'/>
    </>
  )
}

export default AdminLogin