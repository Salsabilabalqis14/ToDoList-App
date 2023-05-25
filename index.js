const mongoose = require('mongoose')
const express = require('express')
const loginRegisRoutes = require('./routes/login-regis-routes')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB')
    })


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/user', loginRegisRoutes)

app.listen(3000, () => {
    console.log('Server started on port 3000')
})