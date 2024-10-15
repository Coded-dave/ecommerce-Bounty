// src/components/Dashboard.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, updateUserRole } from '../properties/userSlice';
import { addProduct, addToCart } from '../properties/productSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const users = useSelector((state) => state.users.users);
  const products = useSelector((state) => state.products.products);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');


  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  // Check if user is logged in
  if (!currentUser) {
    return (
      <div>
        <h2>Please log in</h2>
        <button onClick={() => navigate('/')}>Go to Home</button> {/* Redirect to Home */}
      </div>
    );
  }

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleChangeRole = (id, newRole) => {
    dispatch(updateUserRole({ id, newRole })); // Dispatch action to update user role
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (name && price && quantity) {
      const newProduct = {
        id: Date.now(),
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        sellerId: currentUser.id, // Associate product with the seller
      };
      dispatch(addProduct(newProduct));
      setName('');
      setPrice('');
      setQuantity('');
    }
  };
 
  const handleAddToCart = (id) => {
    dispatch(addToCart({ id, quantity: 1 }));
  };
  
  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/cart');
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {currentUser.username}!</h2>

      {currentUser.role === 'admin' && (
         <div className="admin-container">
      <h2>Manage Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.role})
            <select
              value={user.role}
              onChange={(e) => handleChangeRole(user.id, e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
              <option value="shopper">Shopper</option>
            </select>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
      )}

      {currentUser.role === 'seller' && (
      <div className="seller-page-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      <h3>Your Products</h3>
      {products.length > 0 ? (
        products
          .filter((product) => product.sellerId === currentUser.id) // Filter products by the current seller
          .map((product) => (
            <div key={product.id}>
              <span>{product.name} - ${product.price} (Qty: {product.quantity})</span>
            </div>
          ))
      ) : (
        <p>No products added yet.</p>
      )}
    </div>
      )}

      {currentUser.role === 'shopper' && (
        <div>
          <h3>Available Products</h3>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id}>
                <span>{product.name} - ${product.price} (Qty: {product.quantity})</span>
                <button onClick={() => handleAddToCart(product.id)}>Buy</button>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
            <button onClick={handleCheckout}>Go to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
