const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/com.js');
const auth = require('../middleware/auth.js');
const admin = require('../middleware/admin.js');

router.post('/post/:postId/com', auth, stuffCtrl.addCom);
router.delete('/post/:postId/com/:comId', auth, admin, stuffCtrl.delCom);
router.put('/post/:postId/com/:comId', auth, admin, stuffCtrl.changeCom);
router.get('/post/:postId/com', auth, stuffCtrl.allComOne);

module.exports = router;