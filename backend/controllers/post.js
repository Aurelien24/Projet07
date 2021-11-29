const Post = require('../models/post');

exports.addPost = (req, res, next) => {

    const post = new Post({
        text: req.body.text,
        image: req.body.image
    });

    post.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.delPost = (req, res, next) => {

    Post.findOne({id:id})
    .then(post => {
        if (!post) {
          return res.status(401).json({ error: 'Post non trouvé !' });
        }
        Post.delet() // Erreur ?
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
    })
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