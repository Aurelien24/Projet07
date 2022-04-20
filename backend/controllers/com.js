const db = require('../models'); // cherche d'office index.js
const { text } = require('body-parser');
const jwt = require('jsonwebtoken');

exports.addCom = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
    const userId = decodedToken.userId;

    let text = req.body.text;
    let postId = req.params.postId;

    db.user.findOne({ where: { id: userId } })
        .then(user => {
            db.com.create({userId: userId, text: text, postId:postId, userName: user.username})
                .then(newCom => res.status(201).json({ 'id': newCom.id, "userName": user.username, "text": newCom.text, "imageURL": newCom.imageURL, "updatedAt": newCom.updatedAt, "createdAt": newCom.createdAt, "userId": newCom.userId }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.delCom = (req, res, next) => {

    let comId = req.params.comId;

    db.com.findOne({
        where: { id: comId }
    })
    .then(com => {
        com.destroy()
            .then(() => res.status(201).json({ message: 'com supprimer' }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(() => res.status(404).json({ error: 'Post non trouvé !' }));
};

exports.changeCom = (req, res, next) => {

    let id = req.params.comId;
    let text = req.body.text
    db.com.findOne({ where: { id: id } })
    .then(com => {
        if (com == null){
            return res.status(404).json({ message : 'Commentaire non trouvé'})
        }
        db.com.update({text: text}, { where: { id: id } })
        .then(() => res.status(201).json({ message: 'Post changer' }))
        .catch(() => res.status(400).json({ error: 'Post non mis a jour !' }));
    })
    .catch(() => res.status(404).json({ error: 'Commentaire non trouvé !' }));
};

exports.allComOne = (req, res, next) => {

    let postId = req.params.postId;
    
    db.com.findAll({ where: { postId: postId }, order: [['createdAt', 'ASC']]})
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));
}