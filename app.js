const express = require('express');
const { success } = require('./helper.js')
const app = express()
const port = 3000
let pokemons =  require('./mock-pokemons'); 
const morgan = require('morgan')
const favicon = require('serve-favicon')


app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))


app.get('/',(req,res) => res.send('Hello, Express 88!'))

app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    res.json(success(pokemon,"Un pokémon as bien été trouver"))
})

app.get('/api/pokemons', (req,res) => {
    const pokemonsNum = pokemons.length
    res.json(success(pokemons,`Voici la liste des ${pokemonsNum} pokemons`))
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))


