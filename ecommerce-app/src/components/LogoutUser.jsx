import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../properties/userSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch logout action
    navigate('/'); // Redirect to home page
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Log Out
    </button>
  );
};

export default LogoutButton;
