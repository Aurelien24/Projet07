const express = require('express');

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const comRoutes = require('./routes/comRoutes');
const path = require('path');

const app = express();

// Permet de controler les accès au server a partir de l'API. Sinon le système bloque automatiquement en raison d'un manque d'autorisation. Considérer comme piratage
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/api/post', postRoutes);
app.use('/api', userRoutes);
app.use('/api', comRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;