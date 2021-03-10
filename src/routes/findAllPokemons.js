const { Pokemon } = require('../database/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée de la bdd'
        res.json({ message, data: pokemons })
      })
      .catch(err => {
        const message = "La liste des pokémons n'a pas pu être récuprée. Réesayez dans quelques instants"
        res.status(500).json({message, data: err }) 
      })
  })
}