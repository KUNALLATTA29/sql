import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig.js';
import User from './userModel.js';

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    assignTo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    assignBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    remark: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

Task.belongsTo(User, { as: 'assignedByUser', foreignKey: 'assignBy' });
Task.belongsTo(User, { as: 'assignedToUser', foreignKey: 'assignTo' });

export default Task;