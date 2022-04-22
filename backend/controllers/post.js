const db = require('../models'); // cherche d'office index.js

const { text } = require('body-parser');
const jwt = require('jsonwebtoken');

exports.addPost = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
    const userId = decodedToken.userId;

    db.user.findOne({ where: { id: userId } })
        .then(user => {
            db.post.create({userId: userId, text: req.body.text, userName: user.username}) // ...imageObjet pour ne pas faire les valeur 1/1
                .then(newPost => res.status(201).json({ 'id': newPost.id, "userName": user.username, "text": newPost.text, "imageURL": newPost.imageURL, "updatedAt": newPost.updatedAt, "createdAt": newPost.createdAt, "userId": newPost.userId  }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.delPost = (req, res, next) => {

    let id = req.params.postId;

    db.post.findOne({
        where: { id: id }
    })
        .then(post => {
            post.destroy()
                .then (res.status(201).json({ message: 'post supprimer' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(() => res.status(404).json({ error: 'Post non trouvé !' }));     
};

exports.changePost = (req, res, next) => {

    let id = req.params.postId;
    let text = req.body.text
    db.post.findOne({ where: { id: id } })
    .then(post => {
        db.post.update({text: text}, { where: { id: id } })
            .then(() => res.status(201).json({ message: 'Post changer' }))
            .catch(() => res.status(400).json({ error: 'Post non mis a jour !' }));
    })
    .catch(() => res.status(404).json({ error: 'Utilisateur non trouvé !' }));
};

exports.allPost = (req, res, next) => {
    db.post.findAll({ order: [
        ['createdAt', 'DESC'],
    ]})
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));
}

exports.onePost = (req, res, next) => {
    let id = req.params.postId;
    
    db.post.findOne({ where: { id: id } })
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));
}