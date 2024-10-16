// src/components/Checkout.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, decrementStock } from '../properties/productSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Checkout = () => {
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // Assuming a 10% tax rate
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const handleConfirmPurchase = () => {
    // Decrement stock for each item in the cart
    cart.forEach(item => {
      dispatch(decrementStock({ id: item.id, quantity: item.quantity }));
    });

    // Logic to handle payment can be added here
    alert('Purchase confirmed! Thank you for your order.');
    dispatch(clearCart()); // Clear the cart after purchase
    navigate('/'); // Navigate back to home or another page after purchase
  };

  const { subtotal, tax, total } = calculateTotal(); // Calculate totals

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart before checking out.</p>
      ) : (
        <div>
          <h3>Your Cart Items:</h3>
          {cart.map((item) => (
            <div key={item.id}>
              <span>{item.name} - ${item.price} (Qty: {item.quantity})</span>
            </div>
          ))}
          <div>
            <h4>Order Summary:</h4>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax (10%): ${tax.toFixed(2)}</p>
            <p><strong>Total: ${total.toFixed(2)}</strong></p>
          </div>
          <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
