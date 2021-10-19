const Task = require('../model');

const getAllTasks = async (req, res) => {
    const tasks = await Task.findAll();
    return res.json(tasks);
}

const createTask = async (req, res) => {
    const newTask = req.body;
    await Task.create(newTask);

    return res.sendStatus(200);
}

const updateTask = async (req, res) => {
    const {id, completed, text} = req.body;
    await Task.update({completed, text}, {
        where: {
            id
        }
    });

    return res.sendStatus(200);
}

const deleteTask = async (req, res) => {
    const { taskId } = req.body;

    await Task.destroy({
        where: {
            id: taskId
        }
    });

    return res.sendStatus(200);
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
}