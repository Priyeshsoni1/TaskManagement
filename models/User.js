const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const subtaskSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, "Subtask subject is required"],
    trim: true,
  },
  deadline: {
    type: Date,
    required: [true, "Subtask deadline is required"],
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed", "done"],
    default: "pending",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const taskSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, "Task subject is required"],
    trim: true,
  },
  deadline: {
    type: Date,
    required: [true, "Task deadline is required"],
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  subtasks: [subtaskSchema],
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "User email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  tasks: [taskSchema],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
