// src/components/Cart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, updateCartQuantity, addToCart } from '../properties/productSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Cart = () => {
  const cart = useSelector((state) => state.products.cart);
  const currentUser = useSelector((state) => state.users.currentUser); // Check for the current user
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // If the user is not logged in, show a message
  if (!currentUser) {
    return (
      <div>
        <h2>Please log in to view your cart.</h2>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product)); // Remove product from cart
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  const handleUpdateQuantity = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0 && newQuantity <= item.quantity) {
      dispatch(updateCartQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // No limitations on adding to the cart
  };

  return (
    <div className="cart">
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <span>{item.name} - ${item.price} (Qty: {item.quantity})</span>
              <button onClick={() => handleUpdateQuantity(item, -1)}>-</button>
              <button onClick={() => handleAddToCart(item, 1)}>+</button>
              <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
            </div>
          ))}
          <button onClick={handleCheckout}>Proceed to Checkout</button>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
