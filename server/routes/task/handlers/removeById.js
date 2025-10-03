const Task = require("../../../models/Task");

function removeById(req, res) {
  const { id } = req.params;

  Task.findByIdAndDelete(id)
    .then((doc) => {
      if (!doc)
        return res.status(404).json({ ok: false, message: "Not found" });
      res.json({ ok: true, deleted: true, doc });
    })
    .catch((err) => {
      res.status(500).json({ ok: false, error: err.message || err });
    });
}

module.exports = removeById;
