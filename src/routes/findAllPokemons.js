const { Pokemon } = require('../database/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée de la bdd'
        res.json({ message, data: pokemons })
      })
  })
}