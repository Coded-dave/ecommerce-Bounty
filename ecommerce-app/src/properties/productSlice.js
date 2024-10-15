// src/features/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { id: 1, name: 'Product 1', price: 20, quantity: 10, inStock: true },
    { id: 2, name: 'Product 2', price: 30, quantity: 0, inStock: false },
    { id: 3, name: 'Product 3', price: 15, quantity: 5, inStock: true },
    // Add more products as needed
  ],
  cart: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const product = action.payload;
        const existingProduct = state.cart.find(item => item.id === product.id);
  
        // Ensure stock does not go below zero
        if (product.quantity > 0) {
          if (existingProduct) {
            existingProduct.quantity += 1; // Increment quantity if already in cart
          } else {
            state.cart.push({ ...product, quantity: 1 }); // Add new product to cart
          }
  
          // Decrement the quantity in stock
          const productInStock = state.products.find(item => item.id === product.id);
          if (productInStock) {
            productInStock.quantity -= 1; // Decrease stock quantity
          }
        } else {
          alert("Product is out of stock!");
        }
      },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    addProduct: (state, action) => {
      state.products.push(action.payload); // Add a new product
    },
    purchaseProduct: (state, action) => {
        const product = state.products.find((p) => p.id === action.payload.id);
        if (product) {
          product.quantity -= action.payload.quantity;
        }
      },
  },
});

export const { addToCart, removeFromCart, clearCart, addProduct, purchaseProduct } = productSlice.actions;

export default productSlice.reducer;
