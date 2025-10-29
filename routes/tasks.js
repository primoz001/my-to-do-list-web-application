const express = require('express');

const router = express.Router();

router.post('/tasks', (req, res, next) => {
  let existingTasks = [];
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    existingTasks = [...tasks];
  }
  if (existingTasks && existingTasks.length > 0) {
    res.status(200).send(existingTasks);
  }
  else {
    res.status(204).send([]);
  }
});

router.post('/tasks/:id', (req, res, next) => {
  const id = req?.params?.id;
  let existingTasks = [];
  let foundTask;
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    existingTasks = [...tasks];
  }
  if (existingTasks && existingTasks.length > 0) {
    if (id) {
      const index = existingTasks.findIndex((x) => x.id === id);
      foundTask = existingTasks[index];
    }
  }
  if (foundTask) {
    res.status(200).send(foundTask);
  }
  else {
    res.status(204).send({});
  }
});

router.post('/add-task', (req, res, next) => {
  const body = req?.body;
  let existingTasks = [];
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    existingTasks = [...tasks];
  }
  existingTasks.push(body);
  localStorage.setItem('tasks', JSON.stringify(existingTasks));
  res.status(200).send(body);
});

router.put('/remove-task/:id', (req, res, next) => {
  const id = req?.params?.id;
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
    res.status(204).send({res: 'Not found'});
  }
});

router.patch('/update-task/:id', (req, res, next) => {
  const id = req?.params?.id;
  const body = req?.body;
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
      existingTasks[index] = body;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(existingTasks));
  if (foundTask) {
    res.status(200).send({res: 'Updated'});
  }
  else {
    res.status(204).send({res: 'Not found'});
  }
});

module.exports = router;
