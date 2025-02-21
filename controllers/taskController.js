import { createTask, getTask, updateTask, deleteTask, getTasksByUserId } from '../service/taskService.js';

export const createNewTask = async (req, res) => {
    try {
        const { name, assignTo, assignBy, remark } = req.body;
        if (!name || !assignTo || !assignBy) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newTask = await createTask(req.body);
        res.status(201).json({ message: 'Task created successfully', newTask });
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await getTask(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error });
    }
};

export const updateTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await updateTask(id, req.body);
        res.status(200).json({ message: 'Task updated successfully', updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

export const deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteTask(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};

export const getTasksAssignedToUser = async (req, res) => {
    try {
        const userId = req.user.id; 
        const tasks = await getTasksByUserId(userId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};