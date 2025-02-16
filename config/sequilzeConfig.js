import { Sequelize } from 'sequelize';
import { dbConfig } from './dbConfig.js';

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    await sequelize.sync({ force: false });
    console.log('Database sync completed');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

connectDB();

export default sequelize;