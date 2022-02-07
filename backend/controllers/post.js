const db = require('../models'); // cherche d'office index.js

const { text } = require('body-parser');
const jwt = require('jsonwebtoken');

// Prendre /post -> Renvoit les postes (mur sans fin)

// prendre /post

/*GET /posts -> récup tout les post
POST /posts - crée un post
GET /posts/1 -> obtien 1 post
PATCH|PUT /posts/1 -> modif un post
DELETE /posts/1 -> supprime un post
*/

// NE PREND PAS LES PHOTOS !!!
exports.addPost = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]; //pAS D'envoit de token
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
    const userId = decodedToken.userId;
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    console.log(token)
    console.log(decodedToken)
    console.log(userId + " seras l'user id")

    db.post.create({text: req.body.text, userId: userId})
        .then(newPost => res.status(201).json({ 'postId': newPost.id }))
        .catch(error => res.status(500).json({ error }));
};

exports.delPost = (req, res, next) => {

    let id = req.params.id;
    let userId = req.body.userId; // Ou peut être ailleur lol
    let admin = req.body.admin;

    db.post.findOne({
        where: { id: id }
    })
    .then(post => {
        console.log("coucou")

        // MANQUE UNE VÉRIFICATION DU ID DE L'UTILISATEUR
        //if(post.userId == userId || admin == true){}

        // Peut se faire en lien avec auth ? Sans passé directement part userId. userId peut donner une info aux hacker

        // Cahnger pour avoir une adresse comme /post/:id du post  et changer le verbe HTTP pour la modification (postman)
        post.destroy() // Erreur ?
            .then(() => res.status(201).json({ message: 'post supprimer' }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(() => res.status(404).json({ error: 'Post non trouvé !' }));
};

exports.changePost = (req, res, next) => {

    let id = req.params.id;
    let text = req.body.text
    db.post.findOne({ where: { id: id } })
    .then(post => {
        console.log("recherche faite")
        db.post.update({text: text}, { where: { id: id } }) // Erreur ?
        .then(() => res.status(201).json({ message: 'Post changer' }))
        .catch(() => res.status(400).json({ error: 'Post non mis a jour !' }));
    })
    .catch(() => res.status(404).json({ error: 'Utilisateur non trouvé !' }));
};

exports.allPost = (req, res, next) => {
console.log("ont passe part allPost")
    db.post.findAll({ order: [
        ['updatedAt', 'DESC'],
    ]})
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));
}

exports.mesPost = (req, res, next) => {


    console.log("ont passe part mesPost")

    // SUPPOSER Récupérer id utilisateur NE FONCTIONNE PAS !!
    const token = req.headers.authorization.split(' ')[1]; //pAS D'envoit de token
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
    const id = decodedToken.userId;

    db.post.findAll({ where: { id: id },
        order: [ ['updatedAt', 'DESC'],
    ]})
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));
}

exports.onePost = (req, res, next) => {
    let id = req.params.id;

    console.log("ont passe part onePost")
    
    db.post.findOne({ where: { id: id } })
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));
}

// Ajouter la demande de post. 