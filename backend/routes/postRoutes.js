const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/post.js');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//let id = req.params.id;

// Utilisateur
router.post('/post', auth, multer, stuffCtrl.addPost);
router.delete('/post/:id', auth, stuffCtrl.delPost);
router.put('/post/:id', auth, multer, stuffCtrl.changePost);
router.get('/post', auth, stuffCtrl.allPost);
router.get('/post/:id', auth, stuffCtrl.onePost);
router.get('/mesPost', auth, stuffCtrl.mesPost);
 
module.exports = router;
