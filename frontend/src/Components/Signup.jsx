import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

function Signup({ setOutput }) {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[errorMsg,setErrorMsg]=useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSignup = async (event) => {
    event.preventDefault();
    const payload = {
      
      name,
      email,
      password,
    };

    try {
      const { data, status } = await axios.post(`${apiUrl}/signup`, payload);
      console.log(data);
  
      // Check for successful registration
      if (status === 201) {
        setOutput(data.output);
        setErrorMsg('Successfully registered. Login to continue.');
      } else if(status==200){
        setErrorMsg('Unexpected status code received.');
      }
    } catch (error) {
      console.log(error.response);
  
      // Handle different status codes
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          setErrorMsg('Please enter all the fields!');
        } else if (status === 409) {
          setErrorMsg('User already exists. Please Login.');
        } else if (status === 500) {
          setErrorMsg('An error occurred on the server. Please try again!');
        } else {
          setErrorMsg('An unexpected error occurred. Please try again!');
        }
      } else {
        setErrorMsg('An error occurred. Please try again!');
      }
    }
  };

  return (
   <div className="body">
     <div className="authContainer">
      <form className="auth-form" onSubmit={handleSignup}>
      <div className="heading">Signup to code with NanOJ</div>
      
      <label htmlFor="name" id="name">User Name:</label>
      <input className="input"
        type="text"
        placeholder='UserName'
        id='2'
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="email" id="email">Email:</label>
      <input className="input"
        type="text"
        placeholder='hgr@gmail.com'
        id='3'
        onChange={(event) => setEmail(event.target.value)}
      />
      <label htmlFor="password" id="password">Password:</label>
      <input className="input"
        type="password"
        placeholder='Password'
        onChange={(event) => setPassword(event.target.value)}
      />
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <button className="submit " type='submit'>Signup</button>
      
      <p className="signup-link">
        <Link to="/">Already have an account?Login</Link>
      </p>
    </form>


    </div>
   </div>
     
    
  );
}

export default Signup;
