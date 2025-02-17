import express from 'express';
import { registerUser, loginUser, handelUser, handelupdate, handeldelete } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', handelUser);
router.put('/:id', handelupdate);
router.delete('/:id', handeldelete);

export default router;