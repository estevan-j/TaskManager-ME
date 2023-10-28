const express = require('express');
const { getAllTaks, createTask, getTask, updateTask, deleteTask, editTask } = require('../../src/controllers/Task');


const router = express.Router();


//Routing
router.route('/').get(getAllTaks).post(createTask);

router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask).put(editTask)



module.exports = router;