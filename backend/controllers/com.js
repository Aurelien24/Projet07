const Post = require('../models/post');
const db = require('../models'); // cherche d'office index.js
const user = require('../models/user');
const com = require('../models/com');
const { text } = require('body-parser');


/*
GET /posts/1/comments
POST /posts/1/comments
GET /posts/1/comments/2
PATCH|PUT /posts/1/comments/2
DELETE /posts/1/comments/2
*/

// RÉCUPÉRER LES ID USER AVEC LE TOKEN; PRENDRE LE POSTID de l'url


// NE PREND PAS LES PHOTOS !!!
exports.addCom = (req, res, next) => {

    let text = req.body.text;
    let userId = req.body.userId;
    let postId = req.params.postId;

    //console.log('postId ='postId);

    db.com.create({
        text:text,
        userId:userId,
        postId:postId
    })
    .then(newCom => res.status(201).json({ 'postId': newCom.id }))
    .catch(error => res.status(500).json({ error }));
};

exports.delCom = (req, res, next) => {

    let postId = req.params.postId;
    let id = req.params.id;
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

    let postId = req.params.postId;
    let id = req.params.id;
    let text = req.body.text
    db.com.findOne({ where: { id: id } })
    .then(com => {
        console.log("recherche faite", com)
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

    // Ne fontionne pas, ont arrive pas ici !

    let postId = req.params.postId;

    console.log("ont passe part allComOne")
    console.log( postId )
    
    db.com.findAll({ where: { postId: postId } }) // erreur ici
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));
}



// ajouter le find des commentaire d'un poste. VueJs doit le demander en début de cycle de vie quand il va afficher les poste.