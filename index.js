const express = require('express')
const path = require('path')
require('dotenv').config()
require('./src/db/mongoose')
const userRouter = require('./src/routers/user')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '/s-client/build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 's-client/build', 'index.html'));
});
app.use(userRouter)

// error-handling middleware function
app.use((err, req, res, next) => {
    res.status(500).send(err.message)
})


const port = process.env.PORT
app.listen(port, () => console.log(`Server is running on port ${port}`))