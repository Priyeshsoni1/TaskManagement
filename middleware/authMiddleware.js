const jwt = require("jsonwebtoken");

const logger = require("../utils/logger");
const { User } = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    console.log(token, process.env.JWT_SECRET);
    logger.info(`[${token}] `);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    logger.info(` ${decoded} `);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    logger.error(err);
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
