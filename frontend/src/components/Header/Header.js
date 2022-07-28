import React,{useEffect} from 'react'
import './Header.css'
import Swal from 'sweetalert2'
import {Navbar,Container,Form,Button,Nav,NavDropdown} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'



function Header(props) {
  
 
  const navigate=useNavigate();
  const logout=()=>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to log out?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor:'#d33' ,
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'log out!'
  }).then((result) => {
     if(result.isConfirmed){
      if(props.user=='admin'){
        localStorage.removeItem('admintoken');
        navigate('/admin');//when log out navigate to admin login 
      }else{
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('token');
        navigate('/');
      }
     }
  })
 }


  return (
    <>
     <Navbar  expand="lg" className='navigationbar'>
      <Container fluid>
        <Navbar.Brand onClick={()=>{navigate('/adminHome')}} className='text-in-navbar' id='nav-brand'>{props.admin?'Admin Panel':props.username}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
            <Nav.Link href="#action2" className='text-in-navbar text-in-navbar ' onClick={logout}>Logout</Nav.Link>
        
           
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header