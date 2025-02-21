import { findTaskById, saveTask, updateTaskById, deleteTaskById } from '../repository/taskRepository.js';
import Task from '../models/taskModel.js'
import User from '../models/userModel.js'


export const createTask = async (data) => {
    return await saveTask(data);
};

export const getTask = async (id) => {
    const task = await findTaskById(id);
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
};

export const updateTask = async (id, data) => {
    const task = await findTaskById(id);
    if (!task) {
        throw new Error('Task not found');
    }
    return await updateTaskById(id, data);
};

export const deleteTask = async (id) => {
    const task = await findTaskById(id);
    if (!task) {
        throw new Error('Task not found');
    }
    return await deleteTaskById(id);
};

export const getTasksByUserId = async (userId) => {
    return await Task.findAll({
        where: { assignTo: userId },
        include: [
            {
                model: User,
                as: 'assignedByUser',
                attributes: ['id', 'name'],
            },
            {
                model: User,
                as: 'assignedToUser',
                attributes: ['id', 'name'],
            },
        ],
    });
};