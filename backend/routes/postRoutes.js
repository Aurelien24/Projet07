const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/post.js');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const admin = require('../middleware/admin.js');

router.post('/post', auth, multer, stuffCtrl.addPost);
router.delete('/post/:postId', auth, admin, stuffCtrl.delPost);
router.put('/post/:postId', auth, admin, multer, stuffCtrl.changePost);
router.get('/post', auth, stuffCtrl.allPost);
router.get('/post/:postId', auth, stuffCtrl.onePost);
 
module.exports = router;