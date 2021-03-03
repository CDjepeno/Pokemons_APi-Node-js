const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const morgan = require('morgan')
const favicon = require('serve-favicon')
const sequelize = require('./src/database/sequelize')


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



app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))


