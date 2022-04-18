const db = require('../models'); // cherche d'office index.js

const { text } = require('body-parser');
const jwt = require('jsonwebtoken');

/*GET /posts -> récup tout les post
POST /posts - crée un post
GET /posts/1 -> obtien 1 post
PATCH|PUT /posts/1 -> modif un post
DELETE /posts/1 -> supprime un post
*/

// NE PREND PAS LES PHOTOS !!!
exports.addPost = (req, res, next) => {

    /* Ajout sans pseudo

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
    const userId = decodedToken.userId;
 
    // futur intégration d'image -> erreur car image n'est pas trouver si il n'y as pas a trouver d'image. Il faudra un if
    //const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    console.log(userId)
    //image.save()
    //    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    //   .catch(error => res.status(400).json({ error }));
    //  imageURL: image
    db.post.create({userId: userId, text: req.body.text, }) // ...imageObjet pour ne pas faire les valeur 1/1
        .then(newPost => res.status(201).json({ 'postId': newPost.id }))
        .catch(error => res.status(500).json({ error })); 
    */

    // Ajout avec pseudo
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
    const userId = decodedToken.userId;

    db.user.findOne({ where: { id: userId } })
        .then(user => {
            db.post.create({userId: userId, text: req.body.text, userName: user.username}) // ...imageObjet pour ne pas faire les valeur 1/1
                .then(newPost => res.status(201).json({ 'postId': newPost.id }))
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
        db.post.update({text: text}, { where: { id: id } }) // Erreur ?
            .then(() => res.status(201).json({ message: 'Post changer' }))
            .catch(() => res.status(400).json({ error: 'Post non mis a jour !' }));
    })
    .catch(() => res.status(404).json({ error: 'Utilisateur non trouvé !' }));
};

exports.allPost = (req, res, next) => {
    db.post.findAll({ order: [
        ['updatedAt', 'DESC'],
    ]})
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));
}

exports.mesPost = (req, res, next) => {

    // SUPPOSER Récupérer id utilisateur NE FONCTIONNE PAS !!
    const token = req.headers.authorization.split(' ')[1]; //pAS D'envoit de token
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
    const id = decodedToken.userId;

    db.post.findAll({ where: { userId: id },
        order: [ ['updatedAt', 'DESC'],
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

// Ajouter la demande de post. 