import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../properties/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Add password state
  const [role, setRole] = useState('shopper'); // Default role
  const [error, setError] = useState(''); // State to store error message
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate from react-router-dom
  const currentUser = useSelector((state) => state.users.currentUser);
  const loginError = useSelector((state) => state.users.loginError); // Assuming your slice has a loginError state

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password, role };

    // Dispatch the login action
    dispatch(loginUser(user));
  };

  // Effect to handle login error
  useEffect(() => {
    if (loginError) {
      setError('Invalid credentials, please try again.'); // Set error message if login failed
    } else if (currentUser && currentUser.role !== role) {
      // Check if the role is incorrect
      setError('Invalid role. Please contact admin for role change.'); // Set error message for invalid role
    } else {
      setError(''); // Clear error if login is successful
    }
  }, [loginError, currentUser, role]);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (currentUser && currentUser.role === role) {
      navigate('/dashboard'); // Redirect to dashboard
    }
  }, [currentUser, role, navigate]);

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
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
