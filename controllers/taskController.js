exports.getAllTasks = async (req, res) => {
  try {
    const user = req.user;

    // Filter out deleted tasks
    const activeTasks = user.tasks
      .filter((task) => !task.deleted)
      .map((task) => {
        return {
          _id: task._id,
          subject: task.subject,
          deadline: task.deadline,
          status: task.status,
          subtasks: task.subtasks.filter((subtask) => !subtask.deleted),
        };
      });

    res.json({ tasks: activeTasks });
  } catch (err) {
    console.error("Error getting tasks:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addTask = async (req, res) => {
  const { subject, deadline, status, subtasks } = req.body;

  if (!subject || !deadline || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = req.user;

    const newTask = {
      subject,
      deadline,
      status,
      deleted: false,
      subtasks,
    };

    user.tasks.push(newTask);
    await user.save();

    const addedTask = user.tasks[user.tasks.length - 1];

    res.status(201).json(addedTask);
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateTask = async (req, res) => {
  const { subject, deadline, status, subtasks } = req.body;
  const { taskId } = req.params;

  try {
    const user = req.user;

    const task = user.tasks.id(taskId);
    if (!task || task.deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (subject !== undefined) task.subject = subject;
    if (deadline !== undefined) task.deadline = deadline;
    if (status !== undefined) task.status = status;
    // if (subtasks !== undefined) task.subtasks = subtasks;

    await user.save();
    res.json(task);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const user = req.user;

    const task = user.tasks.id(taskId);
    if (!task || task.deleted) {
      return res
        .status(404)
        .json({ message: "Task not found or already deleted" });
    }

    task.deleted = true;
    await user.save();

    res.json({ message: "Task soft deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error" });
  }
};
