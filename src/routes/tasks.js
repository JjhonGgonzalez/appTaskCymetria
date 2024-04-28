const express = require('express');
const TaskController = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks', TaskController.index);
router.get('/crear', TaskController.crear);
router.post('/crear', TaskController.store);
router.post('/tasks/delete', TaskController.destroy);
router.get('/tasks/edit/:id', TaskController.edit);
router.post('/tasks/edit/:id', TaskController.actualizar);
module.exports = router;