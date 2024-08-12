import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

import '../Auth.css';




function Login({ setOutput }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[errorMsg,setErrorMsg]=useState('');
  const navigate=useNavigate();
  

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async (event) => {
    event.preventDefault();
    const payload = {
      email,
      password,
    };

    try {
      const { data } = await axios.post(`${apiUrl}/login`, payload);
    
      // Assuming successful login if `data.token` is present
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        console.log(data);
        setOutput(data.output);
        navigate('/problemlist');
      }
       else {
        // Handle unexpected responses or invalid credentials
        setErrorMsg('Login failed. Please check your credentials.');
      }
  
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 401) {
        setErrorMsg('Invalid credentials, kindly recheck.');
      } else if (error.response && error.response.status === 404) {
        setErrorMsg('User not found. Please check your email.');
      } else {
        setErrorMsg('An error occurred. Please try again!');
      }
    }
      
      
      
  };

  return (
  <div className="body">
    <div className="authContainer">
      <form className="auth-form" >
      <div className="heading"><h1>Login to Code with NanOJ</h1></div>
      <label htmlFor="email" id="email">Email:</label>
      <input className='input'
        type="text"
        placeholder='Email'
        id='1'
        onChange={(event) => setEmail(event.target.value)}
      />
      <label htmlFor="password" id="password">Password:</label>
      <input className='input'
        type="password"
        placeholder='Password'
        onChange={(event) => setPassword(event.target.value)}
      />

      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <button className="submit" type='submit' onClick={handleLogin}>Login</button>
      <p className="signup-link">
        <Link to="/signup">Don't have an account?Signup</Link>
      </p>
    </form>


    </div>

  </div>
  );
}

export default Login;
