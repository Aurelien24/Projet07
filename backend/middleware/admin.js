const User = require('../models/user');
const db = require('../models'); // cherche d'office index.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]; //pAS D'envoit de token
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
    const id = decodedToken.userId;
    const postId = req.params.postId;
    const comId = req.params.comId;

  console.log("Le middleware admin est lancer")
        
  db.user.findOne({
    where: { id: id }
  })
  .then(function(user){
    console.log("user.admin = " + user.admin)
    console.log("user.id = " + user.id)
    // Le if ne fonctionne pas. == essayer || est bien ou.
    if (user.admin == "true") {
      console.log("Admin détecter")
    }
    if (user.admin === "true" || user.id === postId || user.id === comId) { // /!\ Laisse l'utilisateur supprimer n'importe quel commentaire sur un post qu'il as crée.
      console.log("Vérification du middleware admin obtenu")
      next();
    } else {
        console.log("Echec d'autorisation des droits administrateur de la requette")
        return;
    }
  })
  .catch(error => res.status(500).json({ error }));
}