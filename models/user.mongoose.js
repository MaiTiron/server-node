//Importer le composant Mongoose
const mongoose = require('mongoose');

/*
Création du model user
*/
    //Définir le Schéma Mongoose
    const UserSchema = new mongoose.Schema({
        firstName:String,
        lastName: String,
        email: String,
        password: String
    });

    //Définir le modele
    mongoose.model('User', UserSchema);
//

/*
Exporter le module
*/
    module.exports = mongoose.model('User');
//

/*
Importer les composants de la route
*/
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
//

const mongoose = require('mongoose');
const mongoServeur = 'mongodb://localhost:27018/blog';
const mongoUser = require('../models/user.mongoose');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extented:false}));

/*
Définir les routes
*/
    //Création d'utilisateur
    router.post('/add', (req, res) => {
        //Créer un utilisateur grace qu model Mongoose
        MongooseUser.create({
            firstName: req.body.firstname,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        },
        //Fonction de call back
        (err, user)=>{
            if (err) {res.json({msg: err});} else {
            } else {res.json({msg:user})}
        });
        
   
    });


module.exports = router;