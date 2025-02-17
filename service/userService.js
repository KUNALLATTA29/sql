import {findUserByEmailId, saveUser, findUserById,updateUserById,deleteUserById} from '../repository/userRepository.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export const register = async(data)=>{
        let existingUser = await findUserByEmailId(data.email)

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        let newData = {name,email,password:hashedPassword}

        const newUser = await saveUser(newData)

        return newUser;
}

export const login = async(data)=>{
    const user = await findUserByEmailId(data.email)
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1h' });

    return token;
}


export const getUser = async(id)=>{
    const user = await findUserById(id)

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    return user;
}

export const updateUser = async(id,data)=>{
    const user = await findUserById(id);

    if (!user) {
        throw new Error('User not found');
    }

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await updateUserById(id, data);
    return updatedUser;
}

export const deleteUser = async (id) => {
    const user = await findUserById(id);

    if (!user) {
        throw new Error('User not found');
    }

    await deleteUserById(id);
    return user;
};