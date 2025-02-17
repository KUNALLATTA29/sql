import * as index from '../models/index.js'

export const findUserByEmailId = async(email)=>{
    const existingUser = await index.userModel.findOne({ where: { email } });
    return existingUser;
}

export const saveUser = async(data)=>{
    return await index.userModel.create(data);
}

export const findUserById = async(id)=>{
    return await index.userModel.findByPk(id);
}

export const updateUserById = async (id, data) => {
    const user = await findUserById(id);
    if (user) {
        Object.assign(user, data);
        await user.save();
    }
    return user;
};

export const deleteUserById = async (id) => {
    const user = await findUserById(id);
    if (user) {
        await user.destroy();
    }
    return user;
};