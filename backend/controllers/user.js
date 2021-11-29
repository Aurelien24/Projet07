const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//const connection = require('../models/query');

// mdp a hacher + saler idéalement. Ne fonctionne pas du tout !!!

exports.addUser = (req, res, next) => {

  /*bcrypt.hash(req.body.password, 10)
    .then(hash => {

      // Y as t'il vraiment besoin de new user ?
      
      const user = new User({
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: hash
      });
      //connection.execute('INSERT INTO `user` (`Pseudo`, `Passeword`, `Mail`) VALUES ("'+req.body.pseudo+'", "'+hash+'", "'+req.body.email+'")');

      ou 

    

      connection.execute('INSERT INTO `user` (`Pseudo`, `Passeword`, `Mail`) VALUES (?, ?, ?)', [req.body.email, hash, req.body.pseudo])
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));*/


  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
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