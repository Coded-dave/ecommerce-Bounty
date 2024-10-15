#!/bin/bash

# Step 1: Initialize Node.js project
echo "Initializing Node.js project..."
mkdir ecommerce-backend
cd ecommerce-backend || exit
npm init -y

# Step 2: Install dependencies
echo "Installing dependencies..."
npm install express mongoose bcryptjs jsonwebtoken dotenv cors

# Step 3: Create .env file
echo "Creating .env file..."
cat <<EOT >> .env
PORT=5000
MONGO_URI=<your-mongo-db-connection-string>
JWT_SECRET=<your-secret-key>
EOT

# Step 4: Create server.js
echo "Creating server.js..."
cat <<EOT >> server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { auth } = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('E-commerce Backend Running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
EOT

# Step 5: Create User model
mkdir models
echo "Creating User model..."
cat <<EOT >> models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'seller', 'shopper'], default: 'shopper' }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
EOT

# Step 6: Create Product model
echo "Creating Product model..."
cat <<EOT >> models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
EOT

# Step 7: Create Order model
echo "Creating Order model..."
cat <<EOT >> models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{ 
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
EOT

# Step 8: Create auth routes
mkdir routes
echo "Creating auth routes..."
cat <<EOT >> routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, password, role });
    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
EOT

# Step 9: Create auth middleware
mkdir middleware
echo "Creating auth middleware..."
cat <<EOT >> middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Check for specific roles
const roleCheck = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};

module.exports = { auth, roleCheck };
EOT

echo "Backend setup is complete!"
