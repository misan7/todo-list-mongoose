const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const routerTasks = require('./routes/tasks')
const routerTask = require('./routes/task')

const apiKey = require('./routes/middlewares/apikey')
const routerbodyParser = require('./routes/middlewares/bodyParser')

// const dbUrl = 'mongodb://localhost:27017/test'
// const PORT = 3000
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const DB_URI = process.env.DB_URI
const PORT = process.env.PORT

const app = express()

mongoose.Promise = Promise
mongoose.connect(dbUrl)

app.use(express.static( path.join(__dirname, '../client') ))
app.set('view engine', 'pug')
app.set('views', path.join( __dirname, 'views'))

app.locals.moment = require('moment')

// app.use(apiKey)
app.use(routerbodyParser)
app.use('/tasks', routerTasks)
app.use('/task', routerTask)

app.listen(PORT)
console.log(`Doing Ninja Things on PORT ${PORT}`);