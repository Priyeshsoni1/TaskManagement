const logger = require("../utils/logger");

const loggerMiddleware = (req, res, next) => {
  const { method, originalUrl } = req;
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      `[${method}] ${originalUrl} - ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};

module.exports = loggerMiddleware;
