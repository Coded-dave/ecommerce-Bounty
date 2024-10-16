# GoodsHub

## GoodsHub
GoodsHub is a frontend eCommerce platform that allows users to register, log in, manage products, and make purchases seamlessly. The application features role-based access for admins, sellers, and shoppers, ensuring a secure and efficient shopping experience.

## Features
- **User Authentication**: Secure login and registration for users.
- **Role-Based Access**: Different roles for admin, seller, and shopper, with tailored functionalities for each.
- **Product Management**: Sellers can add, edit, and delete their products.
- **Shopping Cart**: Users can add products to their cart and proceed to checkout.
- **Responsive Design**: The application is designed to work on various screen sizes, ensuring a good user experience on both mobile and desktop devices.

## Technologies Used
- **Frontend**: React, Redux Toolkit, ViteJS, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB (currently not functional)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Custom CSS for responsive and visually appealing design

## Setup Instructions

### Prerequisites
- Node.js (version 14 or above)
- MongoDB (either local or cloud instance)
- Git (for cloning the repository)

### Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Coded-dave/ecommerce-Bounty.git
   cd GoodsHub
   ```

2. **Install Dependencies**
   - For the **backend** (though not necessary):
     ```bash
     cd backend
     npm install
     ```
   - For the **frontend**:
     ```bash
     cd frontend
     npm install
     ```

3. **Environment Configuration**
   - Create a `.env` file in the **backend** folder and add your MongoDB connection string and other environment variables.
   - Example:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```

(At least that's how it's supposed to work but, It won't be of any use)

5. **Start the Frontend Development Server from the GoodsHub Directory**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173` to view the application.

## User Roles
- **Admin**: Has full access to manage users and roles. can also create new users
- **Seller**: Can add, edit, and delete products.
- **Shopper**: Can browse products, add them to the cart, and make purchases.

## Contributing
Contributions are welcome! If you have suggestions for improvements or find bugs, please open an issue or submit a pull request.

