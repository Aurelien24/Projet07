const Post = require('../models/post');
const db = require('../models'); // cherche d'office index.js
const user = require('../models/user');


// NE PREND PAS LES PHOTOS !!!
exports.addPost = (req, res, next) => {

    db.post.create({text: req.body.text})
        .then(newPost => res.status(201).json({ 'postId': newPost.id }))
        .catch(error => res.status(500).json({ error }));
};

exports.delPost = (req, res, next) => {

    let id = req.body.id;
    let userId = req.body.userId; // Ou peut être ailleur lol

    db.post.findOne({
        where: { id: id }
    })
    .then(post => {
        console.log("coucou")

        // MANQUE UNE VÉRIFICATION DU ID DE L'UTILISATEUR
        //if(post.userId == userId){}

        // Peut se faire en lien avec auth ? Sans passé directement part userId. userId peut donner une info aux hacker

        // Cahnger pour avoir une adresse comme /post/:id du post  et changer le verbe HTTP pour la modification (postman)
        post.destroy() // Erreur ?
            .then(() => res.status(201).json({ message: 'post supprimer' }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(() => res.status(401).json({ error: 'Post non trouvé !' }));
};

exports.changePost = (req, res, next) => {

    const post = new Post({
        text: req.body.text,
        image: req.body.image
    });

    Post.UpdateOne() // Erreur ?
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.addCom = (req, res, next) => {

    const com = new Com({
        text: req.body.text
    });

    com.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.delCom = (req, res, next) => {

   Post.findOne({id:id})
    .then(post => {
        if (!post) {
          return res.status(401).json({ error: 'Post non trouvé !' });
        }
        Post.delet() // Erreur ?
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

exports.changeCom = (req, res, next) => {

    Post.findOne({id:id})
    .then(post => {
        if (!post) {
          return res.status(401).json({ error: 'Post non trouvé !' });
        }
        Post.UpdateOne() // Erreur ?
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};