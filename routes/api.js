/*
Importer les composants de la route
*/
const express = require('express');
const router = express.Router();
const mySql = require('mysql');
const bodyParser = require('body-parser');
//

/*
Configurer la connexion BDD
*/
const connection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todoes'
});

/*
Définition des routes
*/
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extented:false}));



/*
Définition des routes
*/
router.get('/', (req, res) => {
            //Ouvrir la connexion a la bdd
            connection.connect();
            //Renvoyer un flux JSON dans la réponse
            res.json({
                content: 'Hello API'
            });
});

router.post('/tasks', (req, res) => {
    //Ouvrir la connexion a la bdd
    console.log(req.body);
    connection.query(`INSERT INTO tasks (content, category, isDone) 
    VALUES (${req.body.newTaskContent}, ${req.body.newTaskType}, "false"`))

    (error, results, fields) => {
        if(error){
            res.json({content:error})
            
        }else{
            res.json ({content: error, results, fields})
        }
    }
});
            //
            /*
            Exporter le module de route
            */
            module.exports = router;
            //