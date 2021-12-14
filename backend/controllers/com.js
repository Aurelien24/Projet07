const Post = require('../models/post');
const db = require('../models'); // cherche d'office index.js
const user = require('../models/user');
const com = require('../models/com');
const { text } = require('body-parser');


// NE PREND PAS LES PHOTOS !!!
exports.addCom = (req, res, next) => {

    let text = req.body.text;
    let userId = req.body.userId;
    let postId = req.body.postId;

    db.com.create({text: text, userId:userId, postId:postId })
        .then(newCom => res.status(201).json({ 'postId': newCom.id }))
        .catch(error => res.status(500).json({ error }));
};

exports.delCom = (req, res, next) => {

    let id = req.body.id;
    let userId = req.body.userId; // Ou peut être ailleur lol
    let admin = req.body.admin;

    db.com.findOne({
        where: { id: id }
    })
    .then(com => {
        console.log("coucou")
        com.destroy() // Erreur ?
            .then(() => res.status(201).json({ message: 'post supprimer' }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(() => res.status(404).json({ error: 'Post non trouvé !' }));
};

exports.changeCom = (req, res, next) => {

    let id = req.body.id;
    let text = req.body.text
    db.com.findOne({ where: { id: id } })
    .then(com => {
        console.log("recherche faite")
        db.com.update({text: text}, { where: { id: id } }) // Erreur ?
        .then(() => res.status(201).json({ message: 'Post changer' }))
        .catch(() => res.status(400).json({ error: 'Post non mis a jour !' }));
    })
    .catch(() => res.status(404).json({ error: 'Utilisateur non trouvé !' }));
};