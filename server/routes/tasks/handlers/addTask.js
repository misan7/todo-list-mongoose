const Task = require('../../../models/Task')
function addTask(req,res) {

  const { title } = req.body

  const newTask = new Task({ title })

  newTask.save()
    .then( msg => {
      res.redirect('/tasks')
    })
    .catch( err => {
      res.json(err)
    })

}

module.exports = addTask