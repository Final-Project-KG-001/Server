const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "400 Bad Request":
      res.status(400).json({ error: err.error });

      break;

    case "401 Unauthorized":
      res.status(401).json({ error: err.error });

      break;

    case "403 Forbidden":
      res.status(403).json({ error: err.error });

      break;

    case "404 Not Found":
      res.status(404).json({ error: err.error });

      break;

    default:
      res.status(500).json({
        error: {
          message: "Internal Server Error",
        },
      });
      break;
  }
};

module.exports = errorHandler;
