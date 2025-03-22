require('dotenv').config({ path: '../.env' })
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3000;
const userRoutes = require('./routes/userRoutes');

app.use('/api', userRoutes);
app.get('/', (req, res) => res.send('Hello, world!'));

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});