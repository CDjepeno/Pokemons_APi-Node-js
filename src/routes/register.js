const bcrypt = require('bcrypt');
const { User } = require('../database/sequelize')


module.exports = (app) => {
    app.post('/api/register', (req,res) => {
        const password = req.body.password
        bcrypt
            .hash(password,10)
            .then(hash => {
                User
                    .create({ 
                        username: req.body.username,
                        password: hash
                    })
                    .then(user => {
                        const message = `L'utilisateur ${user.username} a été  avec succès`
                        return res.json({ message })
                    })
                    .catch(err => res.status(401).send(err.errors[0].message))
            })
    })
}

