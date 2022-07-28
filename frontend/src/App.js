import {Routes,Route} from 'react-router-dom'
import './App.css';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'
import UserHome from './pages/UserHome';
import AdminLogin from './pages/AdminLogin'
import AdminHome from './pages/AdminHome'
import AddUser from './pages/AddUser';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/userHome' element={<UserHome/>}/>
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/adminHome' element={<AdminHome/>}/>
        <Route  path='adminHome/addUser' element={<AddUser/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
