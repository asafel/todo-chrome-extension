const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers');

router.get('/', taskCtrl.getAllTasks);

router.post('/', taskCtrl.createTask);

router.put('/', taskCtrl.updateTask);

router.delete('/', taskCtrl.deleteTask);

module.exports = router;
