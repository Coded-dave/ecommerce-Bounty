import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../properties/userSlice';
import productReducer from '../properties/productSlice';

// Load users from local storage
const loadState = () => {
    try {
      const serializedState = localStorage.getItem('users');
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
      return undefined;
    }
  };
  
  // Save users to local storage
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state.users);
      localStorage.setItem('users', serializedState);
    } catch (err) {
      // Handle errors
    }
  };
  
  // Load persisted state
  const persistedState = loadState();
  
  // Create the store with preloaded state
  const store = configureStore({
    reducer: {
      users: userReducer,
      products: productReducer,
    },
    preloadedState: {
      users: {
        users: persistedState || [], // Use persisted state or initialize to empty
        currentUser: null,
      },
    },
  });
  
  // Subscribe to store updates to save users to local storage
  store.subscribe(() => {
    saveState(store.getState());
  });
  
  export default store; 