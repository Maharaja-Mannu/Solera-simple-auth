const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

// create an account
router.post('/register', async (req, res) => {
    let username= req.body.username
    const isAlreadyExist = await User.findOne({username});
    if(!isAlreadyExist) {
        const user = new User(req.body)
        try {
            await user.save()
            const token = await user.generateAuthToken()
            res.send({ user, token })
    
        } catch (error) {
            res.status(400).send(error.message)
    
        }
    }else {
        res.status(400).send("User Already Exist!")
    }
})

// authenticate user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })

    } catch (error) {
        res.status(400).send(error.message)
    }
})

// logout
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send('Successfully logged out.')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router