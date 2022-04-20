const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/user');
const mdp = require('../middleware/passeword');
const mail = require('../middleware/mail');  
const auth = require('../middleware/auth');

// Utilisateur
router.post('/signup', mdp, mail, stuffCtrl.signup);
router.post('/login', stuffCtrl.login);
router.put('/changeMDP', mdp, auth, stuffCtrl.changeMDP);
router.post('/addImage', stuffCtrl.addImage); // Innutile dans la version acctuel. Multer n'es même pas mis.
router.put('/changeImage', stuffCtrl.changeImage); // Innutile dans la version acctuel
router.put('/changeEmail', mail, auth, stuffCtrl.changeEmail);
router.get('/user', auth, stuffCtrl.user);
router.delete('/suprCompte', auth, stuffCtrl.suprCompte)

module.exports = router; 