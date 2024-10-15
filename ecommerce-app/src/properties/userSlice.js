import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    currentUser: null,
    loginError: '', 
  },
  reducers: {
    loginUser: (state, action) => {
        const { username, password, role } = action.payload;
    
        // Check if state.users is an array to avoid potential errors
        if (Array.isArray(state.users)) {
            const existingUser = state.users.find(
                (user) => user.username === username && user.password === password
            );
    
            if (existingUser) {
                if (existingUser.role === role) {
                    state.currentUser = existingUser;  // Set the currentUser if found
                    state.loginError = '';  // Clear any previous login error
                } else {
                    state.loginError = 'Invalid role. Please contact admin for role change.'; // Set role error message
                }
            } else {
                state.loginError = 'Invalid username or password.';  // Set invalid credentials message
            }
        } else {
            console.log('User data is not initialized properly.');
            state.loginError = 'User data is not initialized properly.'; // Set initialization error message
        }
    },
      registerUser: (state, action) => {
        const { username, password, role } = action.payload;
        const newUser = { id: Date.now(), username, password, role };
        
        // Check if state.users is an array before trying to push
        if (Array.isArray(state.users)) {
          state.users.push(newUser);  // Immer handles immutability
        } else {
          // If state.users is not an array, we initialize it as an array with the new user
          state.users = [newUser];
        }
      },
      
    updateUserRole: (state, action) => {
        const { id, newRole } = action.payload;
        const user = state.users.find(user => user.id === id);
        if (user) {
          user.role = newRole; // Update user role
        }
      },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null; // Clear current user on logout
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    addUser: (state, action) => {
        // Add new user to the existing users array
        state.users.push(action.payload);
      }
  },
});

export const { addUser, updateUserRole, loginUser, registerUser, setCurrentUser, logoutUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
