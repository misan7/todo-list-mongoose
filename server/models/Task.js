const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema

const TaskSchema = new Schema({
		title: {
			type: String,
			required: true
		},
		createdAt: {
			type: Number,
			default: moment().valueOf()
		},
		modifiedAt: {
			type: Number,
			default: moment().valueOf()
		},
		completed: {
			type: Boolean,
			default: false
		}
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task