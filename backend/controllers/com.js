const db = require('../models'); // cherche d'office index.js
const { text } = require('body-parser');
const jwt = require('jsonwebtoken');


/*
GET /posts/1/comments
POST /posts/1/comments
GET /posts/1/comments/2
PATCH|PUT /posts/1/comments/2
DELETE /posts/1/comments/2
*/

// RÉCUPÉRER LES ID USER AVEC LE TOKEN; PRENDRE LE POSTID de l'url


exports.addCom = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
    const userId = decodedToken.userId;

    let text = req.body.text;
    let postId = req.params.postId;

    db.user.findOne({ where: { id: userId } })
        .then(user => {
            db.com.create({userId: userId, text: text, postId:postId, userName: user.username}) // ...imageObjet pour ne pas faire les valeur 1/1
                .then(newCom => res.status(201).json({ 'comId': newCom.id }))
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
        com.destroy() // Erreur ?
            .then(() => res.status(201).json({ message: 'post supprimer' }))
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
            return res.status(404).json({ message : 'Commentaire non trouvé'}) // a faire sur les autres + vérifier l'url (postId)
        }
        db.com.update({text: text}, { where: { id: id } }) // Erreur ?
        .then(() => res.status(201).json({ message: 'Post changer' }))
        .catch(() => res.status(400).json({ error: 'Post non mis a jour !' }));
    })
    .catch(() => res.status(404).json({ error: 'Commentaire non trouvé !' }));
};

exports.allComOne = (req, res, next) => {

    let postId = req.params.postId;
    
    db.com.findAll({ where: { postId: postId } })
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));
}