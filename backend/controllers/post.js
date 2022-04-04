const db = require('../models'); // cherche d'office index.js

const { text } = require('body-parser');
const jwt = require('jsonwebtoken');
const com = require('../models/com.js');

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

    //const token = req.headers.authorization.split(' ')[1];
    //const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
    //const userId = decodedToken.userId;

    //const imageObjet = JSON.parse(req.body.image) // Ne prend peut etre pas le text !!!
    //delete imageObject._id; //Dans le cour. Peut etre pas nessesaire. Ne devrais avoir de .id

    //const image = new Image ({
    //    ...imageObjet,
    //    imageURL : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    //})
    const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    console.log(image)
    //image.save()
    //    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
     //   .catch(error => res.status(400).json({ error }));
//  userId: userId
    db.post.create({text: req.body.text, imageURL: image}) // ...imageObjet pour ne pas faire les valeur 1/1
        .then(newPost => res.status(201).json({ 'postId': newPost.id }))
        .catch(error => res.status(500).json({ error }));
};

exports.delPost = (req, res, next) => {

    let id = req.params.postId;

    db.post.findOne({
        where: { id: id }
    })
        .then(post => {
            post.destroy() // Erreur ?

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

    console.log(id + " userId de auth.js")

    db.post.findAll({ where: { userId: id },
        order: [ ['updatedAt', 'DESC'],
    ]})
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));
}

exports.onePost = (req, res, next) => {
    let id = req.params.postId;

    console.log("ont passe part onePost")
    
    db.post.findOne({ where: { id: id } })
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));
}

// Ajouter la demande de post. 