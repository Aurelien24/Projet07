const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const db = require('../models'); // cherche d'office index.js
const { Op } = require("sequelize");

//const connection = require('../models/query');

// mdp a hacher + saler idéalement. Ne fonctionne pas du tout !!!

exports.signup = (req, res, next) => {

    console.log("signup se lance")

    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;

    console.log(email)
    console.log(username)
    console.log(password)
    console.log(password2)

    console.log("lancement vérification que ce ne soit pas null")

    if (email == null || username == null || password == null || password2 == null){
      console.log("information nul")
      return res.status(400).json({ 'error': 'missing parameters'});
    } else if (password == password2) {
      db.user.findOne({
        where: { [Op.or]: [{ email: email }, { username: username }] } //  || username: username  -> a regarder aussi le pseudo !
      })
      .then(function(userFound){
        if (!userFound) {
          bcrypt.hash(req.body.password, 10)
          .then(hash => {
            
            db.user.create({
              email: req.body.email,
              username: req.body.username,
              password: hash,
              admin: "false"
            })
            .then(newUser => {
              res.status(200).json({
                userId: newUser.id,
                admin: newUser.admin,
                token: jwt.sign(
                  { userId: newUser.id },
                  'Mon_TOKEN_developpement',
                  { expiresIn: '24h' }
                )
              });
            })
            .catch(error => res.status(500).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));
        } else {
          return res.status(409).json({ message : 'Utilisateur déjà existant'});
        }
      })
      .catch(error => res.status(500).json({ error }));
    } else {
      return res.status(400).json({ message : 'Les mots de passe ne sont pas identique' })
    }
    
};

exports.login = (req, res, next) => {

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
          res.status(200).json({
            userId: user.id,
            admin: user.admin,
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

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
  const id = decodedToken.userId;


  db.user.findOne({ where: { id: id } })
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

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
  const id = decodedToken.userId;

  const image = req.body.image // je suppose que ce sera la

  db.user.findOne({ id: id })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      db.user.updateOne({image: image})
        .then(() => res.status(200).json({ message: 'Image mis a jour'}))
        .catch(error => res.status(400).json( error ));
    })
    .catch(error => res.status(500).json({ error }));
};

// est le meme que add image

exports.changeImage = (req, res, next) => {
  // Recherche l'utilisateur et ajoute une image

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
  const id = decodedToken.userId;

  const image = req.body.image // je suppose que ce sera la

  db.user.findOne({ id: id })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    db.user.updateOne({image: image})
      .then(() => res.status(200).json({ message: 'Image mise a jour'}))
      .catch(error => res.status(400).json( error ));
  })
  .catch(error => res.status(500).json({ error }));
};

exports.changeEmail = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
  const id = decodedToken.userId;

  const email = req.body.newMail;

  db.user.findOne({ where: { id: id } })
  .then(user => {

    db.user.update({email: email}, { where: { id: user.id } })
      .then(() => res.status(200).json({ message: 'email mis a jour'}))
      .catch(error => res.status(400).json( error ));
  })
  .catch(() => res.status(500).json({ error: 'Utilisateur non trouvé !' }));
};

exports.user = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1]; //pAS D'envoit de token
  const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
  const id = decodedToken.userId;

  // risque de donner plus que l'utilisateur et le mail

  db.user.findOne({ where: { id: id } })
    .then(data => res.status(200).json(data))
    .catch(() => res.status(500).json({ error: 'Utilisateur non trouvé !' }));
}

exports.suprCompte = (req, res, next) => {
  
  const token = req.headers.authorization.split(' ')[1]; //pAS D'envoit de token
  const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
  const id = decodedToken.userId;

  console.log(req.body.password)

  db.user.findOne({ where: { id: id } })
    .then(user => { 
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: 'Mot de passe incorrect !' });
          } else {
            console.log("suppression parti ! -> manque un db backend pour finir.")
            db.user.destroy({ where: { id: id } })
              .then(() => res.status(200).json({ message : 'Utilisateur supprimé'})) //Pas de return après supr ?
          }
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}