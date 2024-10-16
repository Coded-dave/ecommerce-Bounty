import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutUser'; // Import the LogoutButton

const Home = () => {
  const currentUser = useSelector((state) => state.users.currentUser);

  return (
    <div className="home-container">
      <h1>Welcome to GoodsHub</h1>
      <p>This app allows admins, sellers, and shoppers to manage users, post products, and make purchases.</p>
      
      <div className="home-navigation">
        {currentUser ? (
          <div>
            <h2>Hello, {currentUser.username}!</h2>
            <LogoutButton /> {/* Show logout button if user is logged in */}
          </div>
        ) : (
          <div>
            <h2>Please log in or register to continue.</h2>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
