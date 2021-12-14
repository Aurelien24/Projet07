const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/com.js')

// Ne crée pas une table a part pour chaque poste. Mauvaise opti ? Force a rechercher potentiellement les com d'un post parmis des millions...
router.post('/addCom', stuffCtrl.addCom);
router.delete('/delCom', stuffCtrl.delCom);
router.put('/changeCom', stuffCtrl.changeCom);


module.exports = router;