import { register, getAllUsers, login, getUser, updateUser, deleteUser } from '../service/userService.js';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(404).json({ message: "all fields are required" });
        }

        const newUser = await register(req.body);

        res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(404).json({ message: "all fields are required" });
        }
        const token = await login(req.body);

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

export const handelUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "id is not provided" });
        }

        const user = await getUser(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

export const handelupdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const updatedUser = await updateUser(id, { name, email, password });

        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

export const handeldelete = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteUser(id);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

export const fetchAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await getUser(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching current user', error });
    }
};