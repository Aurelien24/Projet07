const db = require('../models'); // cherche d'office index.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
    const id = decodedToken.userId;
    const postId = req.params.postId;
    const comId = req.params.comId;

    // Prend les différend cas de figure ou l'utilisateur requière les droits administrateur.

  db.user.findOne({
    where: { id: id }
  })
  .then((user) => {

    // teste si l'utilisateur est un admin :
    if (user.admin == true) {
      next();

    // teste si l'utilisateur modifie/supprime un commentaire :
    } else if (comId != undefined){
      db.com.findOne({
        where: {id: comId}
      })
      .then((com) => {
        // Cause un bug sur les suppréssion de commentaire : "id is not defined" et renvoit une 500
        if (id == com.userId){
          next();
        } else {
          return res.status(401).json({ message : "Vous n'êtes pas autorisé a éffectuer cette action"});
        }
      })
    // Puisque l'utilisateur ne touche pas a un commentaire, ce doit être un post
    } else if (postId != undefined){
      db.post.findOne({
        where: {id: postId}
      })
      .then((post) => {
        // Cause un bug sur les suppréssion de post : "Error: WHERE parameter "id" has invalid "undefined" value" et renvoit une 500
        if (id == post.userId){
          next();
        } else {
          return res.status(401).json({ message : "Vous n'êtes pas autorisé a éffectuer cette action"});
        }
      })
    // Puisque l'utilisateur ne touche ni a un commentaire, ni a un post il y as un problème !
    } else {
        return res.status(401).json({ message : "Echec d'autorisation des droits administrateur de la requette"});
    }
  })
  .catch(error => res.status(500).json({ error }));
}