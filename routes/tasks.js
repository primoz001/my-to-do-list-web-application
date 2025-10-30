const express = require('express');

const router = express.Router();

/**
 * Get task list API
 */
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

/**
 * Get task by ID API
 */
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

/**
 * Add new task API
 */
router.post('/add-task', (req, res, next) => {
  const body = req?.body;
  let existingTasks = [];
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    existingTasks = [...tasks];
  }
  if (body) {
    existingTasks.push(body);
  }
  localStorage.setItem('tasks', JSON.stringify(existingTasks));
  if (body) {
    res.status(200).send(existingTasks);
  }
  else {
    res.status(204).send(existingTasks);
  }
  
});

/**
 * Remove task from list API
 */
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
    res.status(200).send(existingTasks);
  }
  else {
    res.status(204).send(existingTasks);
  }
});

/**
 * Update task in list API
 */
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
    res.status(200).send(existingTasks);
  }
  else {
    res.status(204).send(existingTasks);
  }
});

module.exports = router;
