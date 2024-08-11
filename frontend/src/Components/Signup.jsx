import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

function Signup({ setOutput }) {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSignup = async (event) => {
    event.preventDefault();
    const payload = {
      
      name,
      email,
      password,
    };

    try {
      const { data } = await axios.post(`${apiUrl}/signup`, payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
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
