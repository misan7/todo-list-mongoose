function apiKey(req, res, next) {
  const { api_key } = req.query;

  if (api_key === "12345") next();
  else
    res.json(
      "Invalid api key, type this: http://localhost:3000/tasks?api_key=12345"
    );
}

module.exports = apiKey;
