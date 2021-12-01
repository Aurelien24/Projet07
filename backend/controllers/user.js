const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const db = require('../models'); // cherche d'office index.js

//const connection = require('../models/query');

// mdp a hacher + saler idéalement. Ne fonctionne pas du tout !!!

exports.signup = (req, res, next) => {

    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    if (email == null || username == null || password == null){
      return res.status(400).json({ 'error': 'missing parameters'});
    }

    db.user.findOne({
      where: { email: email }
    })
    .then(function(userFound){
      console.log(userFound);
      if (!userFound) {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
          
          db.user.create({
            email: req.body.email,
            username: req.body.username,
            password: hash
          })
          .then(newUser => res.status(201).json({ 'userId': newUser.id }))
          .catch(error => res.status(500).json({ error }));
        })
      } else {
        return res.status(409).json({ 'error': 'Utilisateur déjà existant'});
      }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'Mon_TOKEN_developpement',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


exports.changeMDP = (req, res, next) => {

  // user model, conflit potentiel avec l'adresse mail

  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
      bcrypt.hash(req.body.newPassword, 10)
      .then(hash => {
        const password = hash;

        User.updateOne({password: hash})
          .then(() => res.status(200).json({ message: 'Mot de passe mis a jour'}))
          .catch(error => res.status(400).json( error ));
      })
      .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

exports.addImage = (req, res, next) => {

  // Recherche l'utilisateur et ajoute une image

  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    User.updateOne({image: image})
      .then(() => res.status(200).json({ message: 'Mot de passe mis a jour'}))
      .catch(error => res.status(400).json( error ));
  })
};

// est le meme que add image

exports.changeImage = (req, res, next) => {

  // Recherche l'utilisateur et ajoute une image

  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    User.updateOne({image: image})
      .then(() => res.status(200).json({ message: 'Mot de passe mis a jour'}))
      .catch(error => res.status(400).json( error ));
  })
};