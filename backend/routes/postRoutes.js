const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/post.js');

//let id = req.params.id;

// Utilisateur
router.post('/post', stuffCtrl.addPost);
router.delete('/post/:id', stuffCtrl.delPost);
router.put('/post/:id', stuffCtrl.changePost);
//router.get('/post', stuffCtrl.allPost);
//router.get('/post/:id', stuffCtrl.unPost);


module.exports = router;
