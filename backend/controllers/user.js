const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const db = require('../models'); // cherche d'office index.js

//const connection = require('../models/query');

// mdp a hacher + saler idéalement. Ne fonctionne pas du tout !!!

exports.signup = (req, res, next) => {

    console.log("on passe part signup !");

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
            password: hash,
            admin: "false"
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

  
  const email = req.body.email;
  const username = req.body.username;

  console.log(username);

  db.user.findOne({ where: { username: username } })
    .then(user => { console.log(user)
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
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

  console.log("on passe part changeMDP !");

  //  ALLERTE SéCURITé : const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
  //  const userId = decodedToken.userId;
  // Au lieu de username !
  
  const username = req.body.username;

  db.user.findOne({ where: { username: username } })
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
        console.log(hash)
        db.user.update({password: hash}, { where: { id: user.id } })
          .then(() => res.status(200).json({ message: 'Mot de passe mis a jour'}))
          .catch(error => res.status(400).json( error ));
      })
      .catch((error) => res.status(500).json({ error }));
    })
    .catch(() => res.status(500).json({ error: 'Mauvais mot de passe' }));
  })
  .catch(() => res.status(500).json({ error: 'Utilisateur non trouvé !' }));
};

exports.addImage = (req, res, next) => {

  // Recherche l'utilisateur et ajoute une image

  db.user.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    db.user.updateOne({image: image})
      .then(() => res.status(200).json({ message: 'Mot de passe mis a jour'}))
      .catch(error => res.status(400).json( error ));
  })
};

// est le meme que add image

exports.changeImage = (req, res, next) => {


  console.log("on passe part changeImage !");
  // Recherche l'utilisateur et ajoute une image

  db.user.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    db.user.updateOne({image: image})
      .then(() => res.status(200).json({ message: 'Mot de passe mis a jour'}))
      .catch(error => res.status(400).json( error ));
  })
};

exports.changeEmail = (req, res, next) => {

  // ALLERTE SéCURITé : const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
  //  const userId = decodedToken.userId;
  // Au lieu de username !

  console.log("on passe part changeEmail !");

  const username = req.body.username;
  const email = req.body.newMail;

  console.log(username);
  console.log(email);

  db.user.findOne({ where: { username: username } })
  .then(user => {

    db.user.update({email: email}, { where: { id: user.id } })
      .then(() => res.status(200).json({ message: 'email mis a jour'}))
      .catch(error => res.status(400).json( error ));
  })
  .catch(() => res.status(500).json({ error: 'Utilisateur non trouvé !' }));
};

exports.user = (req, res, next) => {

  const username = req.body.username;

  console.log(username)

  // risque de donner plus que l'utilisateur et le mail

  db.user.findOne({ where: { username: username } })
    .then(data => res.status(200).json(data))
    .catch(() => res.status(500).json({ error: 'Utilisateur non trouvé !' }));
}