const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const morgan = require('morgan');
const favicon = require('serve-favicon');
const sequelize = require('./src/database/sequelize');


/**
 * Configuration sequelize
 */
sequelize.initDb()

/**
 * Utilisation des middlewares
 */
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

/**
 * Déclaration des points de terminaison
 */
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

/**
 * Erreur 404
 */
app.use(({res}) => {
    const message = "imposssible de trouver la ressource demandée ! vous pouvez essayer une autre URL"
    res.status(404).json({message})
})



app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))


