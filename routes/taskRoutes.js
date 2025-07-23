const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");
const {
  getSubtasks,
  updateSubtasks,
} = require("../controllers/subtaskController");

router.get("/", auth, getAllTasks);
router.post("/", auth, addTask);
router.put("/:taskId", auth, updateTask);
router.delete("/:taskId", auth, deleteTask);

router.get("/:taskId/subtasks", auth, getSubtasks);
router.put("/:taskId/subtasks", auth, updateSubtasks);

module.exports = router;
