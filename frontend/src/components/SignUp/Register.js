import React,{useState} from 'react'
import './SignUp.css'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'





function Register(props) {
  const navigate=useNavigate();
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [error,setError]=useState(false);
  const [errorMessage,setErrorMessage]=useState('');
  const baseUrl='http://localhost:8081/users/register';
  const submitFormData=(e)=>{
    e.preventDefault();
    axios.post(baseUrl,{
      name,
      email,
      password
    }).then((response)=>{
      if(response.data.status==='ok'){
        if(props.role=='user'){
          navigate('/');
        }else{
          navigate('/adminHome');
        }
       
      }else{
        setError(true);
        setErrorMessage('Entered Email Id already exists')
      }
    })
  }

  return (
    <>
   
    <Container className='mt-5'>
      <Row>
        
        <Col md={6} sm={12} lg={8}  className='p-3'>
        <img src='/loginpageimage.svg' alt='loginpage image'/>
        </Col>
        <Col md={6} sm={12} lg={4} className='text-center pt-5'>
          <div className='mb-5'>
          <h4 >{props.role=='user'?"Register":"Add User"}</h4>
          {error && <Alert variant='danger' className='mh-50'>{errorMessage}</Alert>}
          </div>
        
          
        <Form onSubmit={submitFormData}>
        <Form.Group className="mb-3" controlId="name">
        
        <Form.Control type="text" placeholder="Enter Name" name='name' onChange={(e)=>{setName(e.target.value)}}/>
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
       
        <Form.Control type="password" placeholder="Password"  onChange={(e)=>{setPassword(e.target.value)}}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
       
        <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>{setConfirmPassword(e.target.value)}} />
      </Form.Group>
      <div className='d-grid'>
      <Button variant="primary" block type="submit" className='btn-primary'>
        Register
      </Button>
      {(props.role=='user')&&
      <div className='text-center mt-4 '>
       <p onClick={()=>{navigate('/')}} className='registeration-link'>Already a member? Login now</p>
      </div>
      }
      {(props.role=='admin')&&
      <div className='text-center mt-4 '>
      <p onClick={()=>{navigate('/adminHome')}} className='registeration-link'>Go back</p>
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


export default Register


