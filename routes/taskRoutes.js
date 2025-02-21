import express from 'express';
import { createNewTask, getTaskById, updateTaskById, deleteTaskById, getTasksAssignedToUser } from '../controllers/taskController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateUser, createNewTask);
router.get('/:id', authenticateUser, getTaskById);
router.put('/:id', authenticateUser, updateTaskById);
router.delete('/:id', authenticateUser, deleteTaskById);
router.get('/', authenticateUser, getTasksAssignedToUser);

export default router;