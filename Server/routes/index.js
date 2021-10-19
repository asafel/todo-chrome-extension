const express = require('express');
const router = express.Router();

let tasksList = [
  {
    text: 'Task test 1',
    completed: false,
    id: 1
  },
  {
    text: 'Task test 2',
    completed: true,
    id: 2
  }
];

router.get('/', function (req, res) {
  // TODO: return tasks from DB
  res.json(tasksList);
});


router.post('/', function (req, res) {
  const newTask = req.body;
  tasksList.push(newTask);
  res.sendStatus(200);
});

router.put('/', function (req, res) {
  const newTask = req.body;
  tasksList = tasksList.map(task => task.id === newTask.id ? newTask : task);

  res.sendStatus(200);
});

router.delete('/', function (req, res) {
  const {taskId} = req.body;
  tasksList = tasksList.filter((task) => task.id !== taskId );
  res.sendStatus(200);
});

module.exports = router;
