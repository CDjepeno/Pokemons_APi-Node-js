const {Pokemon} = require('../database/sequelize')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', (req,res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            const pokemonDeleted = pokemon    
            Pokemon.destroy({
                where: {id: pokemon.id}
            })
        })
        .then(_ => {
            const message = `le pokemon $ {pokemon} a bien été supprimé`
            res.json({message, data : pokemonDeleted})
        })

    })
}