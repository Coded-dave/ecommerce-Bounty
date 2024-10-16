import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link> {/* Link to the Cart */}
      <Link to="/dashboard">Dashboard</Link>
      {/* Add other links as needed */}
    </nav>
  );
};

export default NavBar;
