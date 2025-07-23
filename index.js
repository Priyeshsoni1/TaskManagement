const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const loggerMiddleware = require("./middleware/loggerMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(loggerMiddleware);
app.use((err, req, res, next) => {
  const logger = require("./utils/logger");
  logger.error(`${err.stack}`);
  res.status(500).json({ error: "Internal Server Error" });
});
app.use(express.json());
console.log("data");
// Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/tasks", require("./routes/taskRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
