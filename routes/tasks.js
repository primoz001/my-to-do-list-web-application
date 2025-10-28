const express = require('express');

const router = express.Router();

router.post('/add-task', (req, res, next) => {
  const body = req.body;
  let existingTasks = [];
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    existingTasks = [...tasks];
  }
  existingTasks.push(body);
  localStorage.setItem('tasks', JSON.stringify(existingTasks));
  res.status(200).send(body);
});

router.patch('/remove-task/:id', (req, res, next) => {
  const id = req.params.id;
  let existingTasks = [];
  let foundTask;
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    existingTasks = [...tasks];
  }
  if (existingTasks && existingTasks.length > 0) {
    foundTask = existingTasks.find((x) => x.id === id);
    if (foundTask) {
      const index = existingTasks.findIndex((x) => x.id === id);
      existingTasks.splice(index, 1);
    }
  }
  localStorage.setItem('tasks', JSON.stringify(existingTasks));
  if (foundTask) {
    res.status(200).send({res: 'Deleted'});
  }
  else {
    res.status(200).send({res: 'Not found'});
  }
});

module.exports = router;
