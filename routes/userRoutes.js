
import express from 'express';
import { registerUser, loginUser, handelUser, handelupdate, handeldelete, fetchAllUsers, getCurrentUser } from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateUser, getCurrentUser);
router.get('/:id', handelUser);
router.put('/:id', handelupdate);
router.delete('/:id', handeldelete);
router.get('/', fetchAllUsers); 

export default router;