require('dotenv').config({ path: '../.env' })
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3000;
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);
app.use('/api', workoutRoutes);
app.get('/', (req, res) => res.send('Hello, world!'));

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});