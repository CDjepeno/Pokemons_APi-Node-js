const { Pokemon } = require('../database/sequelize')
const { Op } = require('sequelize') 
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if(req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5
      
      if(name.length < 2) {
        const message = "Le terme de recherche doit contenir au minumum 2 caractères"
        return res.status(400).json({message})
      }

      return Pokemon.findAndCountAll({ 
        where: { 
          name : {
            [Op.like]: `%${name}%`
          }
        },
        limit: limit,
        order : ['name']
      })
      .then(({count, rows}) => {  
        const message = `Il y a ${count} pokemons qui correpondent au terme de recherche ${name}`;
        res.status(200).json({message, data:rows})
      })
    } else {
      Pokemon.findAll({ order: ['name'] })
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée de la bdd'
        res.json({ message, data: pokemons })
      })
      .catch(err => {
        const message = "La liste des pokémons n'a pas pu être récuprée. Réessayez dans quelques instants"
        res.status(500).json({message, data: err }) 
      })
    }
  })
}