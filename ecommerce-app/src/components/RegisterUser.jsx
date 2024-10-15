// src/components/Register.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../properties/userSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('shopper'); // Default role
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    if (username.trim() === '' || password.trim() === '') {
      alert('Username and Password cannot be empty');
      return;
    }

    // Dispatch the action to register the user
    dispatch(registerUser({ username, password, role }));

    // Redirect to the login page after successful registration
    navigate('/login'); 
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="shopper">Shopper</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
