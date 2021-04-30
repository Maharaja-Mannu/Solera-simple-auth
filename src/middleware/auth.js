const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET)
        // console.log(decoded)
        const user = await User.findOne({
            _id: decoded._id, 'tokens.token': token
        })
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send('Please authenticate')

    }
}

module.exports = auth