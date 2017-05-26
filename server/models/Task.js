const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
		title: {
			type: String,
			required: true
		},
		createdAt: {
			type: Number,
			default: +new Date
		},
		modifiedAt: Number,
		completed: {
			type: Boolean,
			default: false
		}
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task