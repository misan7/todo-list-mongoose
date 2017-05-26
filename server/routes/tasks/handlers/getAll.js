const Task = require('../../../models/Task')

function getAll(req,res) {

	Task.find()
		.then( tasks => {
			res.render('todo/todo', {tasks})
		})
}

module.exports = getAll