import React,{useState} from 'react'
import './Login.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Image from "react-bootstrap/Image";

function Login(props) {
 
  const baseUrl=(props.user=='user'?'http://localhost:8081/users/login':'http://localhost:8081/admin/login')
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState(false);
  const [errorMessage,setErrorMessage]=useState('');
  const[isEmailValid,setEmailValidation]=useState(false);
  const[isPasswordValid,setPasswordValidation]=useState(false);
 const formvalid=()=>{
  if(email==''||password==''){
    return false;
  }
 }
  const submitFormData=(e)=>{
    e.preventDefault();
    if(!formvalid){
      setError(true);
      setErrorMessage('Both email and passoword required');
      return;
    }

      axios.post(baseUrl,
        {
          
            email:email,
            password:password
          
        }).then((response)=>{
          if(response.data.status==='ok'){
              if(props.user=='user'){
              localStorage.setItem('token',response.data.user);
              console.log(response.data);
              localStorage.setItem('userName',response.data.user.Name);
              localStorage.setItem('userEmail',response.data.user.Email);
              navigate('/userHome')
            }else{
              localStorage.setItem('admintoken',response.data.token);
              navigate('/adminHome')
            }
           
          }/*else{
            setError(true);
            setErrorMessage('invalid user name or password');
          }*/
        }).catch((err)=>{
          setError(true);
          setErrorMessage('invalid username or password');
        })
   
  
}
  return (
    <>
   
    <Container className='mt-5'>
      <Row>
        
        <Col md={6} sm={12} lg={8}  className='p-3'>
        <Image  src='/loginpageimage.svg' alt='loginpage image' fluid/>
        </Col>
        <Col md={6} sm={12} lg={4} className='text-center pt-5'>
          <div  className='mb-5'>
          <h4>{props.user=='user'?'Login':"Admin Login"}</h4>
          {error && <Alert variant='danger' className='mh-50' dismissible onClose={()=>setError(false)}>{errorMessage}</Alert>}
          </div>
          
        <Form onSubmit={submitFormData} className='mb-5'>
      <Form.Group className="mb-3" controlId="formBasicEmail" >
        
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={(e)=>{setEmail(e.target.value)}}/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
       
        <Form.Control type="password" placeholder="Password" name='password' onChange={(e)=>{setPassword(e.target.value)}}/>
      </Form.Group>
      <div className='d-grid'>
      <Button variant="primary" block type="submit" className='btn-primary'>
        Login
      </Button>
      {props.user=='user'&&
      <div className='text-center mt-4 '>
        <p onClick={()=>{navigate('signup')}}  className='registeration-link'>Not a member? Sign Up now</p>
      </div>
      }
    
      </div>
    </Form>

        </Col>
      </Row>
    </Container>
   
   
 
    </>
  )
}

export default Login