const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/user');
const mdp = require('../middleware/passeword');
const mail = require('../middleware/mail');
const auth = require('../middleware/auth');

// Utilisateur
router.post('/signup', /*mdp, mail, */stuffCtrl.signup); // Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données
router.post('/login', stuffCtrl.login); // Vérification des informations d'identification de l'utilisateur, renvoie l _id de l'utilisateur depuis la base de données et un token web JSON signé
router.put('/changeMDP', /*mdp,*/ auth, stuffCtrl.changeMDP);
router.post('/addImage', stuffCtrl.addImage);
router.put('/changeImage', stuffCtrl.changeImage);
//router.get('/connecter', auth.connecter) // route de vérification de connexion ? Pour quand les token expire ?
router.put('/changeEmail', auth, stuffCtrl.changeEmail);

module.exports = router;