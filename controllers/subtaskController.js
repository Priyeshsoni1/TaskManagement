exports.getSubtasks = async (req, res) => {
  const { taskId } = req.params;

  try {
    const user = req.user;

    // Find task
    const task = user.tasks.id(taskId);
    if (!task || task.deleted) {
      return res.status(404).json({ message: "Task not found or deleted" });
    }

    const activeSubtasks = task.subtasks.filter((sub) => !sub.deleted);

    res.json({ subtasks: activeSubtasks });
  } catch (err) {
    console.error("Error fetching subtasks:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateSubtasks = async (req, res) => {
  const { taskId } = req.params;
  const { subtasks = [] } = req.body;

  if (!Array.isArray(subtasks)) {
    return res.status(400).json({ error: "Subtasks must be an array." });
  }

  try {
    const user = req.user;

    const task = user.tasks.id(taskId);

    if (!task || task.deleted) {
      return res
        .status(404)
        .json({ error: "Task not found or has been deleted." });
    }

    const deletedSubtasks = task.subtasks.filter((st) => st.deleted);

    const newSubtasks = subtasks.map((st) => ({
      ...st,
      deleted: false,
      _id: st._id || undefined,
    }));

    task.subtasks = [...deletedSubtasks, ...newSubtasks];

    await user.save();

    res.status(200).json({
      message: "Subtasks updated successfully.",
      subtasks: newSubtasks,
    });
  } catch (error) {
    console.error("Error updating subtasks:", error);
    res.status(500).json({ error: "Server error while updating subtasks." });
  }
};
