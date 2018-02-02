/*
Importer les composants de la route
*/
const express = require('express');
const router = express.Router();
//

const mongoose = require('mongoose');
const mongoServeur = 'mongodb://localhost:27018/blog';
/*
Définition des routes
*/


router.get('/', (req, res) => {
    //Connexion a la base de données MongoDB
    mongoose.connect(mongoServeur, (err, db) => {
        //Tester la connexion à la BDD
        if (err) {
            res.render('index', {error: err});
        } else {
            //Connexion ouverte : récupérer la collection de données
            db.collection('posts').find().toArray((err, collection) => {
                //Tester la connexion à la collection
                if (err) {
                    res.render('index', {error: err});
                } else {
                    //Collection récupérée : Rnvoyer le fichier index dans la réponse avec la collection
                    res.render('index', {data: collection});
                };
            });
        };
        //Fermer la connexion
        db.close();
    });
});

//Ajouter une route pour ajouter un article
router.get('/add-post', (req, res) => {
        res.render('add-post');
});
//
/*
Exporter le module de route
*/
module.exports = router;
//