const express = require('express');
const cors = require('cors');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', searchRoutes);
app.use('/api', authRoutes);

module.exports = app;