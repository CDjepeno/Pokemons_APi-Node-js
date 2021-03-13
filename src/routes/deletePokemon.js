const {Pokemon} = require('../database/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', auth, (req,res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            if(pokemon === null) {
                const message = "Le pokemon n'existe pas. Réessayez avec un autre identifiant"
                res.status(404).json({message})
            }
            const pokemonDeleted = pokemon    
            return Pokemon.destroy({
                where: {id: pokemon.id}
            })
            
            .then(_ => {
                const message = `le pokemon ${pokemon} a bien été supprimé`
                res.json({message, data : pokemonDeleted})
            })
            .catch((err) => {
                const message = "Le pokemon n'a pas pu être supprimer"
                res.status(500).json({message, data: err})
            })
        })
    })
}