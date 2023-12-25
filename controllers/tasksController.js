const Task = require('../Models/tasksModel');

// Array of tasks, each represented by an instance of the 'Task' model
let tasks = [
  new Task(1, 'Task 1', false),
  new Task(2, 'Task 2', true),  
  new Task(3, 'Task 3', false)  
];

const getAllTasks = (req, res) => {
  // Sending the 'tasks' array as a JSON response
  res.json(tasks);
};

module.exports = {
  getAllTasks,
};
