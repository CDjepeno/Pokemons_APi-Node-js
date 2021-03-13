const { User } = require('../database/sequelize'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const privatekey = require('../auth/private_key');
const user = require('../models/user');

module.exports = (app) => {
    app.post('/api/login', (req,res) => {
        User.findOne({ where: { username: req.body.username } })
        .then(user => {
            if(!user) {
                const message = "L'utilisateur demandé n'éxiste pas."
                return res.status(404).json({ message })
            }
         
            bcrypt.compare(req.body.password, user.password)
            .then(isPasswordValid => {
                if(isPasswordValid) {
                    const token = jwt.sign(
                        { userId: user.id },
                        privatekey,
                        { expiresIn: '24h' }
                    )
                    const message = "L'utilisateur a été connecté avec succès"
                    return res.json({ message, data: user, token })
                } else {
                   
                    const message = "Le mot de passe est incorrect."
                    return res.status(401).json({ message, data: user })
                }
            })
        })
        .catch((err) => {
            const message = "L'utilisateur n'a pas pu être connecter. Réesayez dans quelques instants"
            return res.status(500).json({ message, data: err })
        })
    }) 
}