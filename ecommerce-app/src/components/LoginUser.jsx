import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../properties/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Add password state
  const [role, setRole] = useState('shopper'); // Default role
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate from react-router-dom
  const currentUser = useSelector((state) => state.users.currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password, role };

    // Dispatch the login action
    dispatch(loginUser(user));

    // Redirect if login is successful and user exists
    if (currentUser) {
      navigate('/dashboard'); // Redirect to dashboard
    }
  };

  // Redirect to dashboard if already logged in
  if (currentUser) {
    navigate('/dashboard');
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password" // Ensure this is a password field
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="shopper">Shopper</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
