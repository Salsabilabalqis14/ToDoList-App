const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

require('dotenv').config()

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body

        const findExistingEmail = await userModel.findOne({ email })
        if (findExistingEmail){
            return res.status(409).json({ message: 'Email already exists' })
        } 

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new userModel({ username, email, password: hashPassword})
        await newUser.save()

        res.status(201).json({ message: 'User created successfully' })

    } catch (e) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const matchPassword = bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(409).json({ message: 'Password is wrong'})
        }
        
        const token = jwt.sign({ userId: user._id}, process.env.TOKEN_SECRET)

        res.status(200).json({ message: 'Successful Login', token })

    } catch (e) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = router