const express = require('express')
const router = express.Router()

const getAll = require('./handlers/getAll')
const addTask = require('./handlers/addTask')
const doneTask = require('./handlers/doneTask')

router.get('/', getAll)
router.post('/', addTask)
router.get('/done', doneTask)

module.exports = router