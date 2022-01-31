const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/post.js');
const auth = require('../middleware/auth');

//let id = req.params.id;

// Utilisateur
router.post('/post', auth, stuffCtrl.addPost);
router.delete('/post/:id', auth, stuffCtrl.delPost);
router.put('/post/:id', auth, stuffCtrl.changePost);
router.get('/post', auth, stuffCtrl.allPost);
router.get('/post/:id', auth, stuffCtrl.onePost);


module.exports = router;
