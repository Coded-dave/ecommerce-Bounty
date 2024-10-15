import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    currentUser: null,
  },
  reducers: {
    loginUser: (state, action) => {
        const { username, password, role } = action.payload;
      
        // Check if state.users is an array to avoid potential errors
        if (Array.isArray(state.users)) {
          const existingUser = state.users.find(
            (user) => user.username === username && user.password === password && user.role === role
          );
      
          if (existingUser) {
            state.currentUser = existingUser;  // Set the currentUser if found
          } else {
            console.log('Invalid username, password, or role');  // Better to use console log than alert in a reducer
          }
        } else {
          console.log('User data is not initialized properly.');
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
  },
});

export const { updateUserRole, loginUser, registerUser, setCurrentUser, logoutUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
