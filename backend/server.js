require('dotenv').config({ path: '../.env' })
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.SERVER_PORT || 3000;
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes to be consumed by frontend
app.use('/api', userRoutes);
app.use('/api', workoutRoutes);
app.use('/api', exerciseRoutes);

// Start server
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});