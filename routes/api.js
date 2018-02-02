/*
Importer les composants de la route
*/
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
//

const mongoose = require('mongoose');
const mongoServeur = 'mongodb://localhost:27018/blog';



    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extented:false}));



/*
Définition des routes
*/
router.get('/', (req, res) => {
            //Renvoyer un flux JSON dans la réponse
            res.json({content: 'Hello API'});
});

router.post('/posts', (req, res) => {
   //Connexion a la base de données MongoDB
    mongoose.connect(mongoServeur, (err, db)=>{
        //Tester la connexion à la BDD
        if(err){
            res.json({error:err});
        }else{
            //Connexion ouverte : récupérer la collection de données
            db.collection('posts').find().toArray((err, collection)=>{
                //Tester la connexion à la collection
                if(err){
                    res.json({error:err});
                }else{
                    res.json(collection);
                }
            });
        };
        //Fermer la connexion
        db.close();
    });
});

router.post('/add-post', (req, res) => {
        console.log(req.body);
        mongoose.connect(mongoServeur, (err, db)=>{
        //Tester la connexion à la BDD
        if(err){res.render('add-post', {msg: newObject})}
        else{
            db.collection('posts').insert({
                title:req.body.title,
                content:req.body.content,
                type:req.body.type
            }, (err, newObject)=>{
                if(err) {res.render('add-post', {msg:err})}
                else{
                    res.render('add-post', {msg: newObject})
                }
            });
        };
        //Fermer la connexion
        db.close();
    });
});
//
/*
Exporter le module de route
*/
module.exports = router;
//