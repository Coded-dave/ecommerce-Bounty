import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, updateUserRole, addUser } from '../properties/userSlice';
import { addProduct, addToCart, updateProduct, removeProduct } from '../properties/productSlice'; 
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const users = useSelector((state) => state.users.users);
  const products = useSelector((state) => state.products.products);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [newRole, setNewRole] = useState('shopper');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current User: ", currentUser);
    console.log("Products: ", products);
  }, [currentUser, products]);

  if (!currentUser) {
    return (
      <div>
        <h2>Please log in</h2>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const handleAddUser = () => {
    if (newUsername && newPassword) {
      const newUser = {
        id: Date.now(),
        username: newUsername,
        password: newPassword,
        role: newRole,
      };
      dispatch(addUser(newUser));
      setNewUsername('');
      setNewPassword('');
      setNewRole('shopper');
    }
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleChangeRole = (id, newRole) => {
    dispatch(updateUserRole({ id, newRole }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (name && price && quantity) {
      const newProduct = {
        id: Date.now(),
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        sellerId: currentUser.id,
      };
      dispatch(addProduct(newProduct));
      setName('');
      setPrice('');
      setQuantity('');
    }
  };

  const handleUpdateProduct = (productId, updatedField, value) => {
    const updatedProduct = products.find(product => product.id === productId);
    if (updatedProduct) {
      const newProductData = {
        ...updatedProduct,
        [updatedField]: value, // Directly set the new value from the input
      };
      dispatch(updateProduct(newProductData));
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleCheckout = () => {
    navigate('/cart');
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
};

  return (
    <div className="admin-page">
      <h2>Dashboard</h2>

      {currentUser.role === 'admin' && (
        <div>
          <h3>Registered Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username} ({user.role}) 
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                <select
                  value={user.role}
                  onChange={(e) => handleChangeRole(user.id, e.target.value)}
                >
                  <option value="shopper">Shopper</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </li>
            ))}
          </ul>

          <h3>Add New User</h3>
          <input
            type="text"
            placeholder="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="shopper">Shopper</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleAddUser}>Add User</button>
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

          <h3>Available Products</h3>
            {products.length > 0 ? (
            products.map((product) => (
                <div key={product.id} style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleUpdateProduct(product.id, 'name', e.target.value)}
                />
                <input
                    type="number"
                    value={product.price}
                    onChange={(e) => handleUpdateProduct(product.id, 'price', parseFloat(e.target.value))}
                />
                <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleUpdateProduct(product.id, 'quantity', parseInt(e.target.value, 10))}
                />
                <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                </div>
            ))
            ) : (
            <p>No products available.</p>
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
                {product.quantity > 0 ? (
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                ) : (
                  <button disabled>Out of Stock</button>
                )}
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
