import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage';
import Register from './components/RegisterUser';
import Login from './components/LoginUser';
import Dashboard from './components/DashboardPage';
import NavBar from './components/NavBar';
import ProductList from './components/List'; // Import ProductList
import Cart from './components/CartPage'; // Import Cart
import Checkout from './components/Checkout'; // Import Checkout


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductList />} /> {/* New Route for Products */}
        <Route path="/cart" element={<Cart />} /> {/* New Route for Cart */}
        <Route path="/checkout" element={<Checkout />} /> {/* New Route for Checkout */}
      </Routes>
    </Router>
  );
}

export default App;
