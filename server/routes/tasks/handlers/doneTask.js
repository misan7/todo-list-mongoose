const Task = require('../../../models/Task')

function doneTask(req,res) {

	Task.find({completed:true})
		.then( tasks => {
			res.render('done/done', {tasks})
		})
}

module.exports = doneTask