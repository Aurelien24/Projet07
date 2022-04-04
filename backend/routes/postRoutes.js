const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/post.js');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const admin = require('../middleware/admin.js');

//let id = req.params.id;

// Utilisateur
router.post('/post', auth, multer, stuffCtrl.addPost); //  
router.delete('/post/:postId', auth, admin, stuffCtrl.delPost);
router.put('/post/:postId', auth, admin, multer, stuffCtrl.changePost);
router.get('/post', auth, stuffCtrl.allPost);
router.get('/post/:postId', auth, stuffCtrl.onePost);
router.get('/mesPost', auth, stuffCtrl.mesPost);
 
module.exports = router;