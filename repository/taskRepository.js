import Task from '../models/taskModel.js';

export const findTaskById = async (id) => {
    return await Task.findByPk(id);
};

export const saveTask = async (data) => {
    return await Task.create(data);
};

export const updateTaskById = async (id, data) => {
    const task = await findTaskById(id);
    if (task) {
        Object.assign(task, data);
        await task.save();
    }
    return task;
};

export const deleteTaskById = async (id) => {
    const task = await findTaskById(id);
    if (task) {
        await task.destroy();
    }
    return task;
};