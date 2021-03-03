const express = require('express');
const { success } = require('./helper.js')
const { getUniqueId } = require('./helper.js')
const bodyParser = require('body-parser')
const { Sequelize } = require('sequelize')
const app = express()
const port = 3000
let pokemons =  require('./mock-pokemons'); 
const morgan = require('morgan')
const favicon = require('serve-favicon')

/**
 * configuration Sequelize
 */
const sequelize = new Sequelize(
    'pokedex',
    'root',
    '',
    {
        host:'localhost', 
        dialect:'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)

sequelize.authenticate()
    .then(_ => console.log('la connexion à la base de données a bien été faite'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

/**
 * Utilisation des middlewares
 */
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

/**
 * Page d'accueil
 */
app.get('/',(req,res) => res.send('Hello, Express !'))

/**
 * Récupération des pokemons
 */
app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    res.json(success(pokemon,"Un pokémon as bien été trouver"))
})

/**
 * Récupération d'un pokemon
 */
app.get('/api/pokemons', (req,res) => {
    const pokemonsNum = pokemons.length
    res.json(success(pokemons,`Voici la liste des ${pokemonsNum} pokemons`))
})

/**
 * Ajout d'un pokemon
 */
app.post('/api/pokemons', (req,res) => {
    const id = getUniqueId(pokemons)
    const pokemonsCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonsCreated)
    const message = `Le pokemons ${pokemonsCreated.name} a bien été crée`
    res.json(success(pokemonsCreated,message))
})

/**
 * Modification d'un pokemon
 */
app.put('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    res.json(success(pokemonUpdated, `Le pokemon ${pokemonUpdated.name} à bien été modifier`))
})

/**
 * Supression d'un pokemon
 */
app.delete('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons.filter(pokemon => pokemon.id !== id) 
    res.json(success(pokemonDeleted,`Le pokemon ${pokemonDeleted.name} à bien été supprimer`))
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))


