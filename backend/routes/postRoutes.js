const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/post.js')

// Utilisateur
router.post('/addPost', stuffCtrl.addPost);
router.delete('/delPost', stuffCtrl.delPost);
router.put('/changePost', stuffCtrl.changePost);
router.post('/addCom', stuffCtrl.addCom);
router.delete('/delCom', stuffCtrl.delCom);
router.put('/changeCom', stuffCtrl.changeCom);


module.exports = router;