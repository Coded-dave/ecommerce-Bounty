import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [
          { id: 1, name: 'Product 1', price: 20, quantity: 10 }, // Removed inStock
          { id: 2, name: 'Product 2', price: 30, quantity: 0 }, // Removed inStock
          { id: 3, name: 'Product 3', price: 15, quantity: 5 }, // Removed inStock
          // Add more products as needed
        ],
        cart: [],
    },
    reducers: {
    addToCart: (state, action) => {
        const productId = action.payload.id;
        const existingProduct = state.cart.find(item => item.id === productId);
        const product = state.products.find(item => item.id === productId);
      
        // Check if the product is available and not out of stock
        if (product && product.quantity > 0) {
          if (existingProduct) {
            existingProduct.quantity += 1; // Increment quantity if already in cart
          } else {
            state.cart.push({ ...product, quantity: 1 }); // Add new product to cart
          }
          product.quantity -= 1; // Decrease product quantity when added to cart
        } else {
          alert('This product is out of stock.');
        }
      },
      decrementStock: (state, action) => {
        const { id, quantity } = action.payload;
        const product = state.products.find(item => item.id === id);
        if (product) {
          product.quantity -= quantity; // Decrease the stock by the quantity purchased
        }
      },
    removeFromCart: (state, action) => {
      const removedProduct = state.cart.find(item => item.id === action.payload.id);
      if (removedProduct) {
        state.cart = state.cart.filter(item => item.id !== action.payload.id);
        const product = state.products.find(item => item.id === action.payload.id);
        if (product) {
          product.quantity += removedProduct.quantity; // Restore quantity when removed from cart
        }
      }
    },
    clearCart: (state) => {
      state.cart.forEach(item => {
        const product = state.products.find(p => p.id === item.id);
        if (product) {
          product.quantity += item.quantity; // Restore quantities for all items in cart
        }
      });
      state.cart = [];
    },
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        quantity: action.payload.quantity >= 0 ? action.payload.quantity : 0, // Ensure quantity is valid
      };
      state.products.push(newProduct); // Add a new product
    },
    removeProduct: (state, action) => {
        const id = action.payload; // Expect the ID of the product to be removed
        state.products = state.products.filter((product) => product.id !== id); // Filter out the product with the specified ID
    },
    purchaseProduct: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (product) {
        product.quantity -= action.payload.quantity;
      }
    },
    updateCartQuantity: (state, action) => {
        const { id, quantity } = action.payload;
        const productInCart = state.cart.find(item => item.id === id);
        const product = state.products.find(item => item.id === id);
  
        if (productInCart && product) {
          // Check if quantity to be set is valid
          if (quantity <= 0) {
            // Remove product if quantity is zero or less
            state.cart = state.cart.filter(item => item.id !== id);
            product.quantity += productInCart.quantity; // Restore quantity
          } else if (quantity <= product.quantity + productInCart.quantity) {
            // Update quantity in cart
            const difference = quantity - productInCart.quantity;
            productInCart.quantity = quantity; // Update quantity in cart
            product.quantity -= difference; // Update product stock
          } else {
            alert('Cannot exceed available stock.');
          }
        }
    },
        updateProduct: (state, action) => {
            const updatedProduct = action.payload; // Destructure the whole updated product object
            const existingProduct = state.products.find((product) => product.id === updatedProduct.id);
            
            if (existingProduct) {
                existingProduct.name = updatedProduct.name;
                existingProduct.price = updatedProduct.price;
                existingProduct.quantity = updatedProduct.quantity;
            }
        },
  },
});

export const { removeProduct, updateProduct, decrementStock, updateCartQuantity, addToCart, removeFromCart, clearCart, addProduct, purchaseProduct } = productSlice.actions;

export default productSlice.reducer;
