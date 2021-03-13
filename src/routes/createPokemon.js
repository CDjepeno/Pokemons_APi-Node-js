const { ValidationError, UniqueConstraintError } = require('sequelize');
const { Pokemon } = require('../database/sequelize');

module.exports = (app) => {
    app.post('/api/pokemons',(req,res) => {

        Pokemon.create(req.body)
        .then(pokemon => {
            const message = `Le pokemon ${req.body.name} a bien été crée`
            res.json({message, data : pokemon})
        })
        .catch((err) => {
            if(err instanceof ValidationError) {
                return res.status(400).json({ message: err.message, data: err })
            }
            if(err instanceof UniqueConstraintError) {
                return res.status(400).json({ message: err.message, data: err })
            }
            const message = "Un problème est survenue lors de la création du pokemon"
            res.status(500).json({message, data: err})
        })
    })
}