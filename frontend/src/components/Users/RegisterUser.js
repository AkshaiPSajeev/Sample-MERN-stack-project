import React,{useState} from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Image from "react-bootstrap/Image";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './RegisterUser'


function RegisterUser() {
    const [name,setName]=useState('');
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [confirmPassword,setConfirmPassword]=useState('');
const [error,setError]=useState(false);
const [errorMessage,setErrorMessage]=useState('');
const baseUrl='http://localhost:8081/users/register';
const navigate=useNavigate();
const submitFormData=(e)=>{
    e.preventDefault();
    axios.post(baseUrl,{
      name,
      email,
      password
    }).then((response)=>{
      if(response.data.status==='ok'){
        navigate('/adminHome');
      }else{
        setError(true);
        setErrorMessage('Entered Email Id already exists')
      }
    })
  }

  return (
    <>
        <Container className=' pt-5 px-5'>
            <div >
            <Row className=' px-1'>
            
            <Col md={6} sm={12} lg={6} className='mx-5'>
           
      
            <Form onSubmit={submitFormData}>
            <div className='text-center mt-4 mb-5 '>
              <h4>Add User</h4>
            </div>
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
      <div className='text-center mt-4 '>
        <p onClick={()=>{navigate('/adminHome')}} className='registeration-link'>Go back</p>
      </div>
    
      </div>
    </Form>
    </Col>
    </Row>
    </div>
        </Container>
    </>
  )
}

export default RegisterUser