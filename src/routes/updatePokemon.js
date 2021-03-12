const {Pokemon} = require('../database/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize');

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req,res) => {
        const id = req.params.id 
        Pokemon.update(req.body, {
            where: {id: id}
        })
        .then(_ => {
            return Pokemon.findByPk(id).then(pokemon => {            
                if(pokemon === null) {
                    const message = "Le pokemon n'a pas été trouvé"
                    return res.status(404).json({message})
                }
                const message = `Le pokemon ${pokemon.name} a bien été modifié`
                res.json({message, data: pokemon})
            })
        })
        .catch((err) => {
            if(err instanceof ValidationError) {
                return res.status(400).json({ message: err.message, data: err })
            }
            if(err instanceof UniqueConstraintError) {
                return res.status(400).json({ message: err.message, data: err })
            }
            const message = "Le pokemon n'a pas pu être modifier. Réessayez dans quelques minutes"
            res.status(500).json({message, data: err})
        })
    })
}