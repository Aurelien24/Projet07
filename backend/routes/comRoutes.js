const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/com.js')

// Ne crée pas une table a part pour chaque poste. Mauvaise opti ? Force a rechercher potentiellement les com d'un post parmis des millions... Obliger avec
router.post('/post/:postId/com', stuffCtrl.addCom);
router.delete('/post/:postId/com/:id', stuffCtrl.delCom);
router.put('/post/:postId/com/:id', stuffCtrl.changeCom);
//router.det('/post/:id/com', stuffCtrl.changeCom);

module.exports = router;