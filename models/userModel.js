import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig.js';

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  }
});

export default User;