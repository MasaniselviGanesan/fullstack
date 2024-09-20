// index.js
const express = require('express');
const mongoose = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
